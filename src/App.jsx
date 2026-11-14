import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="topline">HANDONG GLOBAL UNIVERSITY · 2026 FALL</p>
          <h1>Taehyeon&apos;s Course Manager</h1>
          <p className="subtitle">2026학년도 가을학기 수강 과목 관리 · 신태현 (22101046)</p>
        </div>
        <span className="tag">22101046 · HGU</span>
      </header>
      <CourseList />
      <footer className="bottom">
        <span>HGU 2026 Fall · 신태현</span>
        <span>Local state only · Refresh resets data</span>
      </footer>
    </main>
  );
}