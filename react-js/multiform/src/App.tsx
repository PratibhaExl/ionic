// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Plan from './enrollment/plan';
// import Health from './enrollment/health';
// import Enrollment from './enrollment/enrollment';
// import Test from './enrollment/Test';
// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/enrollment" />} />
//         <Route path="/enrollment" element={<Enrollment />} />
//         <Route path="/plan" element={<Plan />} />
//         <Route path="/health" element={<Health />} />
//         <Route path="/test" element={<Test />} />
//       </Routes>
//     </Router>
//   );
// };

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Plan from './enrollment/plan';
import Health from './enrollment/health';
import Enrollment from './enrollment/enrollment';
import Test from './enrollment/Test';
import Enroll from './enroll/enroll';

const App: React.FC = () => {
  function triggerValidation(): Promise<boolean> {
    throw new Error('Function not implemented.');
  }

  return (
    <Routes>
      <Route path="/" element={<Enrollment />} />
      <Route path="/enroll" element={<Enroll />} />
      {/* <Route path="/plan" element={<Plan  triggerValidation={} formRef={}/>} /> */}
      {/* <Route path="/health" element={<Health />} /> */}
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default App;

