export default {
  data: [
    {
      id: 1,
      category: 'culture',
      title: '그날의 히트문화',
      content: ['지중해', '자연의 아이들', '초등학교', '황소', '홍등'],
      img:
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80',
    },
    {
      id: 3,
      category: 'events',
      title: '그날의 핫이슈들',
      content: [
        '1월 17일 - 다국적군, 이라크에 공격을 개시하다. (걸프전 발발)',
        '2월 27일 - 걸프전 종전. 쿠웨이트 해방.',
        '2월 20일 - 현대자동차에서 2세대 뉴쏘나타를 출시하다.',
        '3월 - 일본에서 크레용 신짱 (짱구는 못말려)이 주간 액션에 정식으로 출간되기 시작함',
        '3월 5일 - 제1호 태풍 샤론이 발생 하였다.',
        '3월 11일 - KBS 라디오 서울 폐국',
        '3월 20일 - SBS 라디오 방송 개국.',
        '4월 3일 - 대한민국, 화성연쇄살인사건이 마지막 열 번째 사건이 발생하다.',
        '5월 7일 - 현대자동차에서 4도어 뉴엑셀을 출시하다',
        '6월 3일 - 대우자동차(한국GM의 전신)에서 프린스 시판',
        '6월 12일 - 보리스 옐친이 러시아의 대통령으로 당선되다.',
        '6월 20일 - 지방선거 광역의회 의원 선거',
        '8월 6일 - 팀 버너스리가 월드 와이드 웹을 공개하다',
        '9월 25일 - 현대정공(현대모비스의 전신)에서 갤로퍼 시판.',
      ],
      img:
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 4,
      category: 'births',
      title: '그날의 태어나신분',
      content: [
        '1월 2일 - 대한민국의 전 가수 유지.',
        '1월 11일 - 대한민국의 가수 효린 (씨스타).',
        '1월 17일 - 대한민국의 가수 기섭 (유키스).',
        '2월 24일 - 대한민국의 배우 나혜미.',
        '4월 2일 - 대한민국의 프로게이머 김상욱.',
        '8월 5일 - 오스트리아의 축구 선수 안드레아스 바이만.',
      ],
      img:
        'https://images.unsplash.com/photo-1509897890357-0ada7e7a70dd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    },
    {
      id: 5,
      category: 'death',
      title: '그날의 돌아가신 분',
      content: [
        '1월 17일 - 노르웨이의 국왕 올라프 5세.',
        '1월 30일 - 미국의 물리학자 존 바딘.',
        '2월 20일 - 캐나다의 정치철학자 유진 포시.',
        '4월 16일 - 영국의 영화 감독 데이비드 린.',
        '4월 26일 - 대한민국의 열사이자 학생운동가 강경대.',
      ],
      img:
        'https://images.unsplash.com/photo-1615778662355-0a77cd0eacee?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    },
  ],
  isLogin: false,
  isSidebar: false,
  userInfo: {
    userEmail: 'test1@naver.com',
    password: '1234qwer',
    userNickName: 'test',
    profileImage: `${process.env.PUBLIC_URL}/img/profile.png`,
    source: 'home',
    accessToken: '',
    likeCard: ['1999-08-02', '1993-01-12', '1994-01-14'],
    recordCard: [
      {
        date: '1999-01-01',
        img: '',
        text: '',
      },
      {
        date: '1999-08-02',
        img: '',
        text: '',
      },
    ],
  },
};
