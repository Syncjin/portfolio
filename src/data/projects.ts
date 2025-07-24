interface ProjectLink {
  title: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  date: string;
  summary: string;
  description: string;
  link?: ProjectLink[];
  tags: string[];
  image?: string;
  width?: number;
  height?: number;
  isClosed?: boolean;
  md?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "나중사",
    date: "2023.01 ~ 2025.05",
    summary: "집을 조건에 따라 찾는 중개사 상담 서비스",
    description:
      "<b>프로젝트 요약</b>\nReact, Next.js, React-Native, Electron.js로 구성된 웹, 모바일, 데스크탑 앱 서비스입니다. 나중사 유저 웹은 나중사 소개 사이트이고, 중개사 웹은 중개사들이 매물을 등록, 제안하고 채팅으로 상담할 수 있습니다. React-Native로 유저앱, 중개사앱이 개발되었으며 Electron.js로 중개사 데스크탑앱을 개발했습니다.\n<b>주요 성과</b>\n문제없고 생산성을 챙기기 위해 사내에 없던 Docker, GitHub Actions로 CI/CD를 구성하여 운영하었고, 상담 기능인 채팅을 위해 socket.io로 채팅 기능, 메시지별 UI를 구현하였습니다. \n기억나는 이슈 해결 경험으로는 Push와 DeepLink, 유입 경로 확인이 중요했던 서비스라서 Appsflyer를 적극 활용하였고 웹에서는 push message를 통해 sound가 재생되지 않아 필요에 의해 Electron.js로 데스크탑앱을 개발하여 배포하면서 멀티플랫폼 운영을 경험할 수 있었습니다.\n<b>외부 활동</b>\n중개사 유치를 위해 나중사 서비스를 위해 서울대학교 캠퍼스타운 입주, 예비창업패키지를 진행하며 투자유치를 위한 활동도 진행했습니다.",
    // link: [
    //   {
    //     title: "유저웹",
    //     url: "https://najoongsa.com",
    //   },
    //   {
    //     title: "유저앱(Android)",
    //     url: "https://play.google.com/store/apps/details?id=com.najoongsa.user.app&hl=ko",
    //   },
    //   {
    //     title: "유저앱(iOS)",
    //     url: "https://apps.apple.com/kr/app/%EB%82%98%EC%A4%91%EC%82%AC/id6470787996",
    //   },
    //   {
    //     title: "중개사앱(Android)",
    //     url: "https://play.google.com/store/apps/details?id=com.najoongsa.realtor.app&hl=ko",
    //   },
    //   {
    //     title: "중개사앱(iOS)",
    //     url: "https://apps.apple.com/kr/app/%EB%82%98%EC%A4%91%EC%82%AC-%EC%A4%91%EA%B0%9C%EC%82%AC-%EC%A0%84%EC%9A%A9/id6476068129",
    //   },
    //   {
    //     title: "중개사 웹",
    //     url: "https://realtor.najoongsa.com",
    //   },
    // ],
    tags: ["React", "Next.js", "React-native", "Electron.js", "Appsflyer", "Socket.io", "Docker", "Github actions", "Styled-components"],
    image: "/projects/thumbnail_01.png",
    width: 420,
    height: 600,
    isClosed: true,
    md: "najoongsa.md",
  },
  {
    id: 2,
    title: "부산 EXPO the WAVE",
    date: "2023.01 ~ 2023.06",
    summary: "2030 부산세계박람회: 대한상공회의소",
    description:
      "<b>프로젝트 요약</b>\n부산 엑스포 유치를 위한 웹사이트로 환경이란 주제를 가진 커뮤니티 사이트입니다.\n<b>주요 성과</b>\nReact를 사용하지 않고 컴포넌트를 thymeleaf로 구현하였고 외국인에게 배포하기 위해 다국어 기능이 포함 되었습니다.",
    link: [{ title: "웹사이트", url: "https://challenges.thewave.net/?lang=KO" }],
    tags: ["Thymeleaf", "Java", "Spring"],
    image: "/projects/thumbnail_02.png",
    width: 420,
    height: 400,
    md: "busan-expo.md",
  },
  {
    id: 3,
    title: "MBC Kokiri",
    date: "2021.09 ~ 2022.07",
    summary: "드라마 컨텐츠를 이용한 한국어 공부 앱, 관리자 사이트",
    description:
      "<b>프로젝트 요약</b>\n드라마 컨텐츠를 재생하는 플레이어와 한국어 공부를 할 수 있는 자막과 퀴즈를 제공하는 앱입니다.\n<b>주요성과</b>\nReact-Native, redux를 사용하여 개발되었고 한국과 베트남으로 배포하기 위해 다국어 기능을 적용했습니다. jw player를 사용하여 개발되었으나 개발당시 영상을 자막에 맞게 정지하거나 이동해야 기능이 있었고 jw player는 1초단위로만 이동이 가능해서 영상과 자막의 싱크가 안맞는 문제가 있었습니다. jw player sdk를 확인해 요구사항에 맞게 React-Native의 NativeModule로 커스텀하여 사용했던 경험이 있습니다.",
    link: [
      { title: "웹사이트", url: "https://kokiri.co/" },
      { title: "AOS앱", url: "https://play.google.com/store/apps/details?id=com.koy.kokiri" },
      { title: "IOS앱", url: "https://apps.apple.com/us/app/kokiri-learn-korean/id1585934625" },
    ],
    tags: ["React-native", "Next.js", "Redux", "JW Player"],
    image: "/projects/thumbnail_03.png",
    width: 420,
    height: 600,
    md: "mbc-kokiri.md",
  },
  {
    id: 4,
    title: "리뷰얼마",
    date: "2020.06 ~ 2020.12",
    summary: "영수증 인증을 통한 리뷰 작성에 대한 리워드 앱, 관리자 사이트",
    description:
      "<b>프로젝트 요약</b>\n입점한 매장에서 사장님이 리워드를 등록하고 해당 가게를 이용 후 리뷰를 작성한 유저가 리워드를 얻어가는 서비스입니다.\n<b>주요 성과</b>\n기존에는 리뷰만 작성하면 되었었는데 경쟁사중 네이버의 영수증인증이 나왔고 2주만에 기획, 디벨롭해서 OCR로 영수증을 분석하는 알고리즘을 개발 및 배포하였습니다. 네이버 기사에 나왔어서 순식간의 4000명의 사장님들을 만날 수 있었습니다.",
    tags: ["React-native", "Next.js", "ocr"],
    image: "/projects/thumbnail_04.png",
    width: 420,
    height: 600,
    isClosed: true,
    md: "review-almah.md",
  },
];
