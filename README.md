# 🌀 Syncjin Portfolio

프론트엔드 개발자 Syncjin의 개인 포트폴리오 웹사이트입니다.  
Next.js 기반의 SSR 구조로 제작되었으며, TailwindCSS와 Typescript를 활용해 정적인 콘텐츠를 효율적으로 구성하고, Docker 및 GitHub Actions를 통해 CI/CD 자동화를 구현했습니다.

👉 **배포 URL:** [https://www.syncjin.com](https://www.syncjin.com)

---

## 🛠️ 프로젝트에 사용된 기술 스택

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **패키지 매니저:** [pnpm](https://pnpm.io/)
- **상태 관리:** [zustand](https://zustand-demo.pmnd.rs/)
- **CI/CD:** GitHub Actions
- **Deployment:** Docker

---

## ⚙️ 로컬 개발 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 또는 npm 사용 시
npm install
npm run dev
```

---

## 🚀 CI/CD

- GitHub Actions를 사용하여 `main` 브랜치에 push 시 자동으로 Docker 이미지를 빌드하고, 서버에 배포되도록 설정되어 있습니다.
- 인증서 갱신 및 HTTPS는 Let's Encrypt + Certbot으로 관리됩니다.

---

## 📁 프로젝트 구조 (간단 예시)

```
├── public/               # 정적 파일 (이미지 등)
├── src/
│   ├── app/              # Next.js 앱 라우팅 및 페이지
│   ├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── store/            # 상태 관리
│   ├── types/            # 타입 정의
│   └── utils/            # 유틸리티 함수
├── .github/
│   └── workflows/        # GitHub Actions CI/CD 설정
└── Dockerfile            # Docker 빌드 정의
```

---

## 📬 Contact

문의는 아래 이메일로 주세요.  
📧 **dldndldms@gmail.com**
