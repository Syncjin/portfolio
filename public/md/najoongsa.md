# 나중사 (Najoongsa)

**개발 기간**: 2023.01 ~ 2025.05  
**프로젝트 유형**: 웹/모바일/데스크탑 앱 서비스  
**역할**: 개발리드

## 프로젝트 요약

React, Next.js, React-Native, Electron.js로 구성된 **멀티플랫폼 중개사 상담 서비스**입니다.

## 주요 기여

1. 플랫폼 전반의 설계 및 개발 주도했습니다.
2. 제한적인 인력 상황에 필요한 서비스가 많기 때문에 React환경에서 사용 할 수 있는 기술들을 채택해 여러 플랫폼에서 사용했습니다.
3. 유저와 중개사 두 부분을 이용자로서 유입시키는게 중요했는데 신생 서비스다보니 유료로 사용하는 중개사들은 꺼리는 상황이 있었습니다. 중개사 50명정도 이용했었고 서비스 홍보방식을 매물 요청서에 맞는 매물을 가지고 있는 중개사에게 알리는 기능을 자동화하여 이용 중개사가 대폭 증가시킨 경험이 있습니다. 50명 (한달 후) -> 3000명.

### 주요 플랫폼

- **나중사 유저 웹 (Next.js)**: 나중사 소개 사이트
- **중개사 웹 (Next.js)**: 매물 등록, 제안, 채팅 상담
- **유저 앱 (React-Native)**: 모바일 사용자 앱
- **중개사 앱 (React-Native)**: 모바일 중개사 앱
- **중개사 데스크탑 앱 (Electron.js)**: 데스크탑 중개사 앱

## 주요 성과

### 기술적 성과

- **CI/CD 구축**: Docker, GitHub Actions를 활용한 자동화된 배포 파이프라인 구축
- **실시간 채팅**: Socket.io를 활용한 실시간 채팅 기능 및 메시지별 UI 구현
- **푸시 알림**: AppsFlyer를 활용한 Push 알림 및 DeepLink 구현
- **멀티플랫폼**: 웹, 모바일, 데스크탑 앱의 개발 및 통합 운영 경험

### 해결한 기술적 이슈

1. **웹 푸시 알림 사운드 문제**: 웹에서 푸시 메시지 사운드 재생 제한으로 인해 Electron.js 데스크탑 앱 개발하여 요청서, 채팅 알림에 사운드 재생으로 중개사의 빠른 답변을 얻을 수 있었습니다.
2. **앱 유입 경로 추적**: AppsFlyer를 활용한 정확한 유입 경로 분석 및 마케팅 효과 측정하고 OneLink를 사용한 DeepLink로 서비스 홍보에 필요한 QR, 알림톡 링크, 문자메시지 링크등에 사용하였습니다.
3. **실시간 채팅 동기화**: Socket.io를 활용한 채팅 기능이 있고 access token이 있어야만 채팅방에 접속됩니다. 앱에서 Background로 되었을때 disconnect될 수 있는데 access token이 만료되었을 수도 있어서 토큰을 재발급받고 매끄럽게 재연결이 되도록 하였습니다.
4. **네트워크 이슈**: 개발 테스트시에는 환경이 좋아 문제가 없지만 실 서비스 운영시에는 네트워크 문제가 생겨서 장애가 일어나는 경우가 발생합니다. Retry 로직과 네트워크 확인 ui를 추가하여 고객문의로 오는 경우를 많이 줄일 수 있었습니다.

## 외부 활동

### 창업 지원 프로그램

투자유치를 위한 다양한 활동 참여했습니다.

- **서울대학교 캠퍼스타운** 입주
- **예비창업패키지** 선정 (24.03.13 ~ 25.03.13)

## 기술 스택

- **Frontend**: React, Next.js, React-Native, Electron.js
- **Styling**: Styled-components
- **상태 관리**: Zustand, Tanstack-query
- **실시간 통신**: Socket.io
- **배포/운영**: Docker, GitHub Actions, Code push(기술이 관리되기 전까지만 이용했고 EAS로 옮기는것을 검토하고 있었습니다.)
- **분석 도구**: AppsFlyer

## 프로젝트 링크

- [유저 웹사이트](https://najoongsa.com)
- [유저 앱 (Android)](https://play.google.com/store/apps/details?id=com.najoongsa.user.app&hl=ko)
- [유저 앱 (iOS)](https://apps.apple.com/kr/app/%EB%82%98%EC%A4%91%EC%82%AC/id6470787996)
- [중개사 앱 (Android)](https://play.google.com/store/apps/details?id=com.najoongsa.realtor.app&hl=ko)
- [중개사 앱 (iOS)](https://apps.apple.com/kr/app/%EB%82%98%EC%A4%91%EC%82%AC-%EC%A4%91%EA%B0%9C%EC%82%AC-%EC%A0%84%EC%9A%A9/id6476068129)
- [중개사 웹사이트](https://realtor.najoongsa.com)
