export type FoodCategory = "korean" | "chinese" | "japanese" | "western" | "asian";
export type BudgetTier = "cheap" | "mid" | "expensive";

export interface Restaurant {
  id: string;
  name: string;
  menu: string;
  price: string;
  url: string;
  category: FoodCategory | "team";
  budget?: BudgetTier;
}

export type CategorySelection = FoodCategory | "any";

export const foodCategoryLabels: Record<CategorySelection, string> = {
  korean: "🍚 한식",
  chinese: "🥟 중식",
  japanese: "🍣 일식",
  western: "🍝 양식",
  asian: "🍜 아시안",
  any: "🎲 아무거나",
};

export const budgetOptions: { tier: BudgetTier; label: string; emoji: string }[] = [
  { tier: "cheap", emoji: "🪨", label: "오늘 거지에요" },
  { tier: "mid", emoji: "😋", label: "적당히 맛있는거!" },
  { tier: "expensive", emoji: "💸", label: "오늘 월급날이다" },
];

let _id = 0;
const id = () => `r${++_id}`;

export const restaurants: Restaurant[] = [
  // ── 전 카테고리 공통 ~7000원 ──
  { id: id(), name: "GS25", menu: "삼김 + 컵라면", price: "3,000원", url: "", category: "korean", budget: "cheap" },
  { id: id(), name: "GS25", menu: "삼김 + 컵라면", price: "3,000원", url: "", category: "chinese", budget: "cheap" },
  { id: id(), name: "GS25", menu: "삼김 + 컵라면", price: "3,000원", url: "", category: "japanese", budget: "cheap" },
  { id: id(), name: "GS25", menu: "삼김 + 컵라면", price: "3,000원", url: "", category: "western", budget: "cheap" },
  { id: id(), name: "GS25", menu: "삼김 + 컵라면", price: "3,000원", url: "", category: "asian", budget: "cheap" },
  { id: id(), name: "조계사", menu: "공양", price: "맑은 마음", url: "", category: "korean", budget: "cheap" },
  { id: id(), name: "조계사", menu: "공양", price: "맑은 마음", url: "", category: "chinese", budget: "cheap" },
  { id: id(), name: "조계사", menu: "공양", price: "맑은 마음", url: "", category: "japanese", budget: "cheap" },
  { id: id(), name: "조계사", menu: "공양", price: "맑은 마음", url: "", category: "western", budget: "cheap" },
  { id: id(), name: "조계사", menu: "공양", price: "맑은 마음", url: "", category: "asian", budget: "cheap" },
  { id: id(), name: "단식", menu: "이산화탄소", price: "무료", url: "", category: "korean", budget: "cheap" },
  { id: id(), name: "단식", menu: "이산화탄소", price: "무료", url: "", category: "chinese", budget: "cheap" },
  { id: id(), name: "단식", menu: "이산화탄소", price: "무료", url: "", category: "japanese", budget: "cheap" },
  { id: id(), name: "단식", menu: "이산화탄소", price: "무료", url: "", category: "western", budget: "cheap" },
  { id: id(), name: "단식", menu: "이산화탄소", price: "무료", url: "", category: "asian", budget: "cheap" },
  // ── 한식 전용 ~7000원 ──
  { id: id(), name: "리김밥", menu: "김밥", price: "맑은 마음", url: "", category: "korean", budget: "cheap" },

  // ── 한식 7000~15000원 ──
  { id: id(), name: "강문순두부 종각본점", menu: "우삼겹 순두부 / 해물 순두부", price: "10,000~11,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "공평동 꼼장어집", menu: "꼼장어", price: "13,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "광화문 미진", menu: "메밀냉면 / 메밀전병", price: "10,000~12,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "교동전선생 종로구청점", menu: "순두부찌개+5가지 전+밥", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "권서방네순대국 종각점", menu: "얼큰순대국 / 김치찜정식", price: "10,000~12,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "김밥스탠다드", menu: "현미텐더 / 통새우 샐러드", price: "7,900원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "동해물회", menu: "물회", price: "15,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "병천유황오리", menu: "오리 훈제덮밥", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "서당골 광화문점", menu: "게장비빔밥 / 김치찜정식", price: "12,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "서울회관", menu: "제육정식 / 고등어백반", price: "9,900원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "시래기담은", menu: "시래기담은 비빔밥상", price: "13,800원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "신도세기 종로구청점", menu: "매운갈비찜 정식", price: "13,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "옛날장터", menu: "고등어정식", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "옛마을", menu: "제육쌈밥 / 김치찌개", price: "10,000~11,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "오감부대", menu: "오감부대 / 김치찌개", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "완백부대찌개", menu: "완백부대찌개", price: "11,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "이여곰탕 종로점", menu: "곰탕", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "종로도담", menu: "김치찜정식 / 부추전", price: "12,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "청진옥", menu: "해장국", price: "12,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "힛더밥", menu: "오리훈제 라이트볼", price: "11,900원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "의정부 부대찌개&돈까스", menu: "부대찌개 / 돈까스", price: "12,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "전주밥차", menu: "한식뷔페", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "성가백암순대", menu: "순대국밥", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "부산돼지국밥", menu: "돼지국밥", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "흥진옥", menu: "뼈해장국", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "관북", menu: "항정순대국", price: "13,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "정일품", menu: "소머리국밥", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "강남면옥 인사동", menu: "비빔냉면 / 물냉면", price: "12,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "남도식객", menu: "묵은지 갈비찜 / 육전 / 갈비탕", price: "11,000~12,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "모랑해물솥밥 종로구청점", menu: "해물솥밥 / 곤드레솥밥", price: "12,000~14,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "삼봉도담", menu: "한우사골닭칼국수", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "얼큰한 조백이 수제비", menu: "낙지해물수제비 / 감자해물 칼+수제비", price: "9,000~10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "엄용백 돼지국밥 종각점", menu: "맑은/진한 엄용백 돼지국밥", price: "13,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "오세계향", menu: "비건짬뽕", price: "11,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "을지면옥", menu: "냉면", price: "15,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "인사동마늘보쌈", menu: "보쌈정식 / 부추전", price: "12,000~13,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "인사동보리밥", menu: "보리밥정식 / 쭈꾸미정식", price: "14,000~16,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "일미식당", menu: "청국장 / 오징어볶음", price: "10,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "취야벌국시", menu: "만두국 / 취야국시", price: "11,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "평양고깃집", menu: "제육볶음 정식 / 소고기 샤브샤브", price: "12,000~13,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "형제불백", menu: "소불백 / 돼지불백", price: "9,000~11,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "호반", menu: "콩비지", price: "9,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "혜성한정식", menu: "점심백반", price: "15,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "인사동양조장", menu: "꼬막비빔밥", price: "12,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "소문난마산아구", menu: "찜정식", price: "11,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "태말녀투가리감자탕", menu: "뼈없는 투가리 수제비", price: "11,000원", url: "", category: "korean", budget: "mid" },
  { id: id(), name: "메밀란", menu: "냉메밀 / 비빔메밀 / 메밀들깨칼국수", price: "13,000원", url: "", category: "korean", budget: "mid" },

  // ── 한식 15000원 이상 ──
  { id: id(), name: "만도리 신라스테이 광화문", menu: "한우곱도리탕 / 닭도리탕", price: "38,000~48,000원", url: "", category: "korean", budget: "expensive" },
  { id: id(), name: "백년토종삼계탕", menu: "토종삼계탕", price: "19,000원", url: "", category: "korean", budget: "expensive" },
  { id: id(), name: "보리보리", menu: "시래기 털레기 / 제육", price: "22,000원", url: "", category: "korean", budget: "expensive" },
  { id: id(), name: "서린낙지", menu: "낙지볶음", price: "25,000원", url: "", category: "korean", budget: "expensive" },
  { id: id(), name: "오도집", menu: "김치찜 2인 / 소고기무국", price: "22,000원~", url: "", category: "korean", budget: "expensive" },
  { id: id(), name: "두림", menu: "두부보쌈 / 두부낙지볶음", price: "25,000~27,000원", url: "", category: "korean", budget: "expensive" },
  { id: id(), name: "신라제면", menu: "낙지 비빔칼국수(2인)", price: "26,000원", url: "", category: "korean", budget: "expensive" },
  { id: id(), name: "안국고다", menu: "육회비빔밥 / 불고기비빔밥", price: "16,000~24,000원", url: "", category: "korean", budget: "expensive" },
  { id: id(), name: "정담은보쌈", menu: "보쌈(소)", price: "32,000원", url: "", category: "korean", budget: "expensive" },
  { id: id(), name: "코미도리", menu: "도미돌솥밥", price: "17,000원", url: "", category: "korean", budget: "expensive" },
  { id: id(), name: "인사도담", menu: "낙지볶음(2인) / 뚝배기 돼지갈비찜", price: "18,000~33,000원", url: "", category: "korean", budget: "expensive" },

  // ── 중식 7000~15000원 ──
  { id: id(), name: "거구장", menu: "삼선간짜장 / 짬뽕 / 탕수육", price: "9,000~12,000원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "차이니즈키친 홍성원 본점", menu: "고추간짜장 / 삼선짬뽕", price: "10,000~12,000원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "청화 우육도삭면", menu: "우육도삭면", price: "9,800원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "황산샤브 요리면가 종로점", menu: "소/양고기 샤브샤브 정식", price: "12,000원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "마라공방", menu: "마라탕 / 마라샹궈", price: "9,000~15,000원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "한양중식 종로점", menu: "차돌짬뽕 / 한양탕수육", price: "12,000원~", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "마파두부 낙원동점", menu: "마파두부덮밥 / 새우수제군만두", price: "12,000원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "만복림", menu: "삼선 짬뽕 / 팔진탕면", price: "11,000~13,000원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "오한수우육면가 서린점", menu: "홍콩우육탕면 / 청경채 도가니탕면", price: "9,800~12,000원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "원흥", menu: "짬뽕", price: "9,000원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "일일향", menu: "해물짜장 / 잡채볶음밥", price: "14,000원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "만리향", menu: "짜장면", price: "7,000원", url: "", category: "chinese", budget: "mid" },
  { id: id(), name: "샤오바오우육면 종로본점", menu: "우육면 / 꿔바로우 / 가지만두", price: "10,000원", url: "", category: "chinese", budget: "mid" },

  // ── 중식 15000원 이상 ──
  { id: id(), name: "마라중독", menu: "훠궈 무한리필", price: "18,800원", url: "", category: "chinese", budget: "expensive" },

  // ── 일식 7000~15000원 ──
  { id: id(), name: "가쯔야 무교본점", menu: "히레까스정식", price: "14,000원", url: "", category: "japanese", budget: "mid" },
  { id: id(), name: "아비꼬 광화문점", menu: "통등심돈카츠 / 카레카츠정식", price: "13,200~13,300원", url: "", category: "japanese", budget: "mid" },
  { id: id(), name: "온센 광화문점", menu: "온센텐동 / 아나고텐동", price: "10,900~16,900원", url: "", category: "japanese", budget: "mid" },
  { id: id(), name: "도마 유즈라멘", menu: "유즈시오(소금) 라멘", price: "12,000원", url: "", category: "japanese", budget: "mid" },
  { id: id(), name: "라쿠엔", menu: "버크셔K 로스카츠", price: "14,000원", url: "", category: "japanese", budget: "mid" },
  { id: id(), name: "동경암", menu: "김치치즈 가쯔나베 / 돈까스+알밥", price: "13,000~15,000원", url: "", category: "japanese", budget: "mid" },

  // ── 일식 15000원 이상 ──
  { id: id(), name: "알돈", menu: "만남의 카츠 / 육사시미소바", price: "14,000~20,000원", url: "", category: "japanese", budget: "expensive" },
  { id: id(), name: "호호식당 익선", menu: "히레가츠정식 / 가츠나베정식 / 사케동", price: "16,000~18,000원", url: "", category: "japanese", budget: "expensive" },
  { id: id(), name: "일월카츠 안국점", menu: "목살카츠 / 로스카츠 / 히레카츠", price: "14,000~20,000원", url: "", category: "japanese", budget: "expensive" },
  { id: id(), name: "동아리 무교점", menu: "명란계란말이", price: "19,000원", url: "", category: "japanese", budget: "expensive" },

  // ── 양식 7000~15000원 ──
  { id: id(), name: "헤비스테이크 종로구청점", menu: "비프스테이크 / 치킨스테이크", price: "9,900~13,500원", url: "", category: "western", budget: "mid" },
  { id: id(), name: "후니도니", menu: "돈까스A세트 / 치즈돈까스", price: "10,500~15,000원", url: "", category: "western", budget: "mid" },
  { id: id(), name: "관훈맨션", menu: "경양식 돈까스 / 함박스테이크", price: "13,000~14,500원", url: "", category: "western", budget: "mid" },
  { id: id(), name: "문경올드", menu: "돈까스", price: "11,000원", url: "", category: "western", budget: "mid" },
  { id: id(), name: "미도인 종로", menu: "스테이크 덮밥 / 청두 사천 탄탄면", price: "9,300~16,800원", url: "", category: "western", budget: "mid" },
  { id: id(), name: "아이소", menu: "경양 오므라이스 / 함바그", price: "10,900~12,900원", url: "", category: "western", budget: "mid" },
  { id: id(), name: "익선돈까스", menu: "익선돈까스", price: "10,000원", url: "", category: "western", budget: "mid" },

  // ── 아시안 7000~15000원 ──
  { id: id(), name: "에머이 종로본점", menu: "양지쌀국수 / 차돌볶음면", price: "11,900~12,000원", url: "", category: "asian", budget: "mid" },
  { id: id(), name: "호앙비엣 관철동점", menu: "소고기 스지 쌀국수", price: "12,000원", url: "", category: "asian", budget: "mid" },
  { id: id(), name: "흐엉관 종각본점", menu: "양지쌀국수", price: "10,500원", url: "", category: "asian", budget: "mid" },
  { id: id(), name: "플러스84", menu: "쇠고기 쌀국수", price: "9,500원", url: "", category: "asian", budget: "mid" },
  { id: id(), name: "호앙비엣 종각역", menu: "소고기 쌀국수 / 분짜 / 에그 반미", price: "9,000~13,000원", url: "", category: "asian", budget: "mid" },
  { id: id(), name: "두르가", menu: "치킨커리", price: "16,000원", url: "", category: "asian", budget: "mid" },
  { id: id(), name: "진중 우육면관 본점", menu: "우육면 / 진수교", price: "8,000~15,000원", url: "", category: "asian", budget: "mid" },
  { id: id(), name: "진중 우육면관 광화문점", menu: "우육면 / 물만두", price: "8,000~15,000원", url: "", category: "asian", budget: "mid" },

  // ── 아시안 15000원 이상 ──
  { id: id(), name: "띤띤", menu: "분짜 / 매운해산물 쌀국수", price: "15,000~16,000원", url: "", category: "asian", budget: "expensive" },
  { id: id(), name: "반쿤콴", menu: "뿌님팟퐁커리", price: "20,000원", url: "", category: "asian", budget: "expensive" },

  // ── 팀점심/회식 ──
  { id: id(), name: "홍성원 (차이니즈키친)", menu: "고추간짜장 / 삼선짬뽕 / 코스", price: "가격대 있음", url: "", category: "team" },
  { id: id(), name: "관훈맨션", menu: "경양식 돈까스 / 관훈정식", price: "13,000~19,500원", url: "", category: "team" },
  { id: id(), name: "종로도담", menu: "김치찜정식 / 부추전 (7인 예약가능)", price: "12,000원", url: "", category: "team" },
  { id: id(), name: "오도집", menu: "김치찜 / 소고기무국 (2인이상)", price: "22,000원~", url: "", category: "team" },
  { id: id(), name: "두림", menu: "두부보쌈 / 두부낙지볶음 (단체)", price: "25,000~27,000원", url: "", category: "team" },
  { id: id(), name: "인사동마늘보쌈", menu: "보쌈정식", price: "12,000~13,000원", url: "", category: "team" },
  { id: id(), name: "남도식객", menu: "묵은지 갈비찜 / 육전 (2인이상)", price: "11,000~12,000원", url: "", category: "team" },
  { id: id(), name: "봉추찜닭 종로타워점", menu: "봉추찜닭 / 뼈없는찜닭", price: "41,000~48,000원(중)", url: "", category: "team" },
  { id: id(), name: "평양고깃집", menu: "제육볶음 정식 / 샤브샤브", price: "12,000~13,000원", url: "", category: "team" },
  { id: id(), name: "만도리 신라스테이 광화문", menu: "한우곱도리탕 / 닭도리탕", price: "38,000~48,000원", url: "", category: "team" },
  { id: id(), name: "대찬횟집", menu: "회", price: "가격 문의", url: "https://naver.me/5PVaGeyb", category: "team" },
  { id: id(), name: "청기와타운", menu: "고기 (룸 가능, 구워주심)", price: "가격 문의", url: "https://naver.me/5bVsW2A0", category: "team" },
  { id: id(), name: "양연화로", menu: "고기 (구워주심)", price: "가격 문의", url: "https://naver.me/GFB1llm9", category: "team" },
  { id: id(), name: "고씨네동해막국수", menu: "막국수 (단체, 룸 가능)", price: "가격 문의", url: "https://naver.me/xZjq6Lsy", category: "team" },
];
