# OSS Week 11 — React Course Manager (Student Starter)

React + Vite 기반 학생 배포용 Sample Project입니다. **조회와 삭제는 완성**, 등록 및 완료 변경은 학생이 직접 구현하도록 `TODO`로 남겨두었습니다.

## 실행 방법

Node.js 20.19+ 또는 22.12+ 권장.

```bash
npm install
npm run dev
```

브라우저에 표시되는 Local URL에 접속하세요. 빌드 테스트: `npm run build`.

## 소스 구조

- `src/App.jsx`: 페이지 전체 레이아웃
- `src/components/CourseList.jsx`: State 및 목록, 삭제 로직, **TODO 1/2**
- `src/components/CourseItem.jsx`: Props로 데이터를 받고 이벤트 콜백 호출
- `src/data/courses.js`: 초기 과목 데이터
- `src/App.css`: 전체 디자인

## 수행 내용

1. 코드를 실행하고 목록 조회·삭제를 확인합니다.
2. 초기 과목 5개 이상, 제목, CSS 3곳 이상 변경합니다.
3. `CourseList.jsx`의 **TODO 1**: 과목 등록 (빈 값 입력 방지, 고유 id 지정, State 업데이트).
4. `CourseList.jsx`의 **TODO 2**: 완료 체크박스 클릭 시 `completed` 상태 변경.
5. 선택: 검색/필터, 이름 수정 기능 추가.
6. GitHub에 Commit/Push 후 Vercel에 배포합니다.
7. README에 프로젝트 소개, 주요 코드 분석 2개, 변경 내용, Weekly Review, GitHub URL, Vercel URL을 정리합니다.

## 확인할 질문

- `CourseList`와 `CourseItem`의 역할은?
- 왜 `courses`를 직접 수정하지 않고 `setCourses()`를 사용할까요?
- `map()`과 `filter()`는 각각 어떤 목적인가요?
- `course`, `onDelete`, `onToggle` Props는 어디에서 전달되나요?
- 브라우저 새로고침 시 데이터가 초기화되는 이유는? (DB/localStorage 없음)

> 교육 목적의 로컬 State 앱입니다. 서버 API 및 데이터베이스는 사용하지 않습니다.




========================================================

22101046 신태현

## STEP 2. 소스코드 분석

### 1. Project Structure (주요 파일 3개 역할)
- `src/App.jsx`: 앱의 전체 레이아웃(헤더, `CourseList` 컴포넌트, 푸터)을 구성하는 최상위 컴포넌트입니다.
- `src/components/CourseList.jsx`: `useState`로 과목 목록(`courses`)과 입력값(`newName`) 상태를 관리하고, 과목 추가/삭제/완료 토글 로직을 처리하는 부모 컴포넌트입니다.
- `src/components/CourseItem.jsx`: 부모(`CourseList`)로부터 과목 데이터와 이벤트 함수를 Props로 전달받아 개별 과목 한 줄을 화면에 렌더링하는 자식 컴포넌트입니다.

### 2. Component & Props (`CourseList`와 `CourseItem`의 관계)
- `CourseList`가 부모 컴포넌트, `CourseItem`이 자식 컴포넌트입니다.
- `CourseList`는 `courses.map()`을 사용해 과목 배열을 순회하면서 각 과목마다 `<CourseItem />`을 생성합니다.
- 이때 `course`(과목 객체), `onDelete`(삭제 핸들러), `onToggle`(완료 토글 핸들러)을 Props로 전달하고, React가 각 항목을 구분할 수 있도록 `key={course.id}`를 함께 넘깁니다.

### 3. State & Event (`useState` 상태 관리 및 삭제 버튼 동작 원리)
- `CourseList`는 `useState(initialCourses)`를 통해 과목 목록을 React 상태(State)로 관리합니다. 일반 변수와 달리 `setCourses`로 상태를 변경하면 React가 변경을 감지해 화면을 자동으로 리렌더링합니다.
- `CourseItem`에서 `Delete` 버튼을 클릭하면 `onClick={() => onDelete(course.id)}`가 실행되어 부모의 `handleDelete(id)`를 호출합니다.
- `handleDelete`는 `filter()`를 이용해 클릭한 `id`와 다른 과목들만 남긴 **새 배열**을 만들어 `setCourses`에 전달함으로써, 원본 배열을 직접 수정하지 않고(불변성 유지) 해당 과목을 삭제합니다.

### 4. Code Analysis (주요 코드 2개 분석)

#### 코드 ①: `src/components/CourseList.jsx` (State 선언 및 삭제 핸들러)
```jsx
export default function CourseList() {
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState('');

  function handleDelete(id) {
    if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
    setCourses(previous => previous.filter(course => course.id !== id));
  }
```
- **동작 원리**: `initialCourses`를 초기값으로 `courses` 상태를 생성합니다. `handleDelete(id)`가 호출되면 `window.confirm`으로 사용자 확인을 받은 뒤, `previous.filter(...)`로 해당 `id`를 제외한 새 배열을 반환하여 상태를 업데이트합니다.

#### 코드 ②: `src/components/CourseList.jsx` (목록 렌더링 및 Props 전달)
```jsx
{courses.length === 0 && <div className="empty">등록된 과목이 없습니다.</div>}
{courses.map(course => (
  <CourseItem key={course.id} course={course} onDelete={handleDelete} onToggle={handleToggle} />
))}
```
- **동작 원리**: 조건부 렌더링(`&&`)으로 과목이 없을 때 안내 문구를 띄우고, 과목이 있으면 `map()`으로 배열의 각 요소를 `CourseItem` 컴포넌트로 변환해 화면에 출력하며 필요한 데이터와 콜백 함수를 Props로 전달합니다.