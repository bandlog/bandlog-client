# Bandlog Monorepo

## Workspaces

- packages/webview — Vite + React + TS (웹뷰)
- packages/app — Flutter 앱 (WebView 셸)

## Scripts

- dev: 모든 패키지 dev 병렬 실행
- build: 모든 패키지 build
- typecheck: 모든 패키지 타입체크
- lint: Biome check 실행(각 패키지에서 정의)
- format: Biome format 실행(각 패키지에서 정의)

## 시작하기

```bash
pnpm i

# 코드 스타일
pnpm -r format     # Biome format
pnpm -r lint       # Biome check

# 웹뷰 개발
pnpm -C packages/webview dev

# Flutter 앱 실행 (웹뷰가 localhost:5173에서 실행 중이어야 함)
cd packages/app
flutter run
```

## 구조

- **packages/webview**: 웹뷰 앱 (Vite + React + TS)
- **packages/app**: Flutter 네이티브 셸 (WebView 로더)

## Biome

- 설정 파일: `biome.json` (루트)
- 패키지 스크립트 예시:
  - `biome check --write ./src`
  - `biome format --write ./src`
