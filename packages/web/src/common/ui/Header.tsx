import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./Button";
import { Sheet } from "./sheet";

interface Props {
	title?: string;
}

function Header({ title }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<header className="relative flex h-14 items-center px-2 py-2">
			<Button
				variant="ghost"
				className="border-none bg-transparent p-2"
				onClick={() => setOpen(true)}
			>
				<Avatar className="size-7 rounded-md">
					<AvatarImage />
					<AvatarFallback className="rounded-md" />
				</Avatar>
				<span className="text-sm/snug tracking-wide">무직백수의 밴드</span>
			</Button>

			<Sheet open={open} onOpenChange={setOpen} side="left">
				<div>시트입니다</div>
			</Sheet>
			{title && (
				<h1 className="-translate-x-1/2 -translate-y-1/2 -tracking-wide absolute top-1/2 left-1/2 font-medium text-xl/snug">
					{title}
				</h1>
			)}
		</header>
	);
}

export { Header };
