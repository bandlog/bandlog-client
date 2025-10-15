import { cva } from "class-variance-authority";
import type { MotionStyle } from "motion/react";
import { AnimatePresence, animate, motion, useMotionValue } from "motion/react";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/common/lib/utils";

type SheetSide = "top" | "right" | "bottom" | "left";

interface SheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	side?: SheetSide;
	threshold?: number;
	velocityThreshold?: number;
	duration?: number;
	className?: string; // panel container classes
	overlayClassName?: string;
	children?: ReactNode;
	portal?: boolean;
}

const panelVariants = cva("fixed z-50 flex flex-col gap-4 bg-background shadow-sm", {
	variants: {
		side: {
			left: "inset-y-0 left-0 h-full w-9/10 rounded-r-2xl",
			right: "inset-y-0 right-0 h-full w-9/10 rounded-l-2xl",
			top: "inset-x-0 top-0 h-auto w-full rounded-b-2xl",
			bottom: "inset-x-0 bottom-0 h-auto w-full rounded-t-2xl",
		},
	},
	defaultVariants: { side: "left" },
});

function Sheet({
	open,
	onOpenChange,
	side = "left",
	threshold = 100,
	velocityThreshold = 500,
	duration = 0.3,
	className,
	overlayClassName,
	children,
	portal = true,
}: SheetProps) {
	const axis = useMemo<"x" | "y">(() => (side === "left" || side === "right" ? "x" : "y"), [side]);

	const closeSign = useMemo<number>(() => {
		switch (side) {
			case "right":
				return 1; // 오른쪽으로 스와이프하여 닫기 (양수 x)
			case "left":
				return -1; // 왼쪽으로 스와이프하여 닫기 (음수 x)
			case "top":
				return -1; // 위로 스와이프하여 닫기 (음수 y)
			case "bottom":
				return 1; // 아래로 스와이프하여 닫기 (양수 y)
		}
	}, [side]);

	const [isDragging, setIsDragging] = useState(false);
	const pos = useMotionValue(0);

	const style = useMemo(() => {
		const s: MotionStyle = {
			willChange: "transform",
			transition: isDragging ? "none" : undefined,
			touchAction: axis === "x" ? ("pan-y" as const) : ("pan-x" as const),
		};
		s[axis] = pos;
		return s as MotionStyle;
	}, [axis, isDragging, pos]);

	const dragConstraints = useMemo(() => {
		const MAX = 1200;
		if (axis === "x") {
			return closeSign === -1 ? { left: -MAX, right: 0 } : { left: 0, right: MAX };
		}
		return closeSign === -1 ? { top: -MAX, bottom: 0 } : { top: 0, bottom: MAX };
	}, [axis, closeSign]);

	const handleDragStart = useCallback(() => setIsDragging(true), []);

	const handleDragEnd = useCallback(
		(
			_: unknown,
			info: { offset?: { x?: number; y?: number }; velocity?: { x?: number; y?: number } },
		) => {
			const offset = axis === "x" ? (info?.offset?.x ?? 0) : (info?.offset?.y ?? 0);
			const velocity = axis === "x" ? (info?.velocity?.x ?? 0) : (info?.velocity?.y ?? 0);
			const movedTowardsClose = offset * closeSign >= threshold;
			const flungTowardsClose = velocity * closeSign >= velocityThreshold;
			if (movedTowardsClose || flungTowardsClose) {
				onOpenChange(false);
			} else {
				animate(pos, 0, { duration, ease: "easeOut" });
			}
			setIsDragging(false);
		},
		[axis, closeSign, threshold, velocityThreshold, onOpenChange, pos, duration],
	);

	const panelEnter = useMemo(() => {
		switch (side) {
			case "left":
				return { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } };
			case "right":
				return { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };
			case "top":
				return { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } };
			case "bottom":
				return { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };
		}
	}, [side]);

	const content = (
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						key="overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration, ease: "easeOut" }}
						className={cn("fixed inset-0 z-40 bg-black/50", overlayClassName ?? "")}
						onClick={() => onOpenChange(false)}
					/>

					<motion.div
						key="panel"
						{...panelEnter}
						transition={{ duration, ease: "easeOut" }}
						drag={axis}
						dragElastic={0}
						dragMomentum={false}
						dragConstraints={dragConstraints}
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
						style={style}
						className={cn(panelVariants({ side }), className)}
					>
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);

	if (portal && typeof document !== "undefined") {
		return createPortal(content, document.body);
	}
	return content;
}

export { Sheet };
