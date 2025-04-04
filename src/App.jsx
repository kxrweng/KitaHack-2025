import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewUserLanding from './pages/NewUserPages/CalibrationAssessment/Landing';
import CareerInterest from './pages/NewUserPages/CalibrationAssessment/CareerInterest';
import RecommendCareerInterest from './pages/NewUserPages/CalibrationAssessment/RecommendCareerInterest';
import MbtiPersonalityCheck from './pages/NewUserPages/CalibrationAssessment/MbtiPersonalityCheck';
import NewUserLayout from './layouts/NewUserLayout';
import Pathways from './pages/AuthUserPages/Upskill/Landing';
import AuthUserLayout from './layouts/AuthUserLayout';
import InterviewPracticeLayout from './layouts/InterviewPracticeLayout';
import InterviewPracticeLanding from './pages/AuthUserPages/InterviewPractice/Landing';
import MoreRoles from './pages/AuthUserPages/InterviewPractice/MoreRoles';
import Aspects from './pages/AuthUserPages/InterviewPractice/Aspects';
import MoreContext from './pages/AuthUserPages/InterviewPractice/MoreContext';
import Question from './pages/AuthUserPages/InterviewPractice/Question';
import InterviewSummary from './pages/AuthUserPages/InterviewPractice/InterviewSummary';
import ResumeBuilderLanding from './pages/AuthUserPages/ResumeBuilder/Landing';
// import Applied from './pages/Applied';
import SoftwareEngineerModuleOne from './pages/AuthUserPages/Upskill/SEPath/ModuleOne';
import ResumeDetails from './pages/AuthUserPages/ResumeBuilder/Details';
import SoftwareEngineerPath from './pages/AuthUserPages/Upskill/SEPath/SoftwareEngineerPath';
import Skills from './pages/AuthUserPages/ResumeBuilder/Skills';
import AppliedTask from './pages/AuthUserPages/Upskill/AppliedTask';
import AppliedScenario from './pages/AuthUserPages/Upskill/AppliedScenario';
import Account from './pages/Account/Account';

import { Navigate } from 'react-router-dom';
import Experience from './pages/AuthUserPages/ResumeBuilder/Experience';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Navigate
              to='/new_user/landing'
              replace
            />
          }
        />

        <Route
          path='/new_user'
          element={<NewUserLayout />}>
          <Route
            path='landing'
            element={<NewUserLanding />}
          />
          <Route
            path='career_interest'
            element={<CareerInterest />}
          />
          <Route
            path='mbti_personality_check'
            element={<MbtiPersonalityCheck />}
          />
          <Route
            path='recommended_career_interest'
            element={<RecommendCareerInterest />}
          />
        </Route>

        <Route
          path='/auth_user'
          element={<AuthUserLayout />}>
          <Route
            path='pathways'
            element={<Pathways />}
          />
          <Route
            path='pathways/software_engineer'
            element={<SoftwareEngineerPath />}
          />
          <Route
            path='pathways/software_engineer/module_1'
            element={<SoftwareEngineerModuleOne />}
          />
          <Route
            path='interview_practice'
            element={<InterviewPracticeLayout />}>
            <Route
              path=''
              element={<InterviewPracticeLanding />}
            />
            <Route
              path='more_roles'
              element={<MoreRoles />}
            />
            <Route
              path='aspects'
              element={<Aspects />}
            />
            <Route
              path='context'
              element={<MoreContext />}
            />
            <Route
              path='question'
              element={<Question />}
            />
            <Route
              path='summary'
              element={<InterviewSummary />}
            />
          </Route>

          <Route
            path='resume_builder'
            element={<ResumeBuilderLanding />}
          />
          <Route
            path='resume_builder/build/details'
            element={<ResumeDetails />}
          />
          <Route
            path='resume_builder/build/skills'
            element={<Skills />}
          />

          <Route
            path='resume_builder/build/experience'
            element={<Experience />}
          />

          <Route
            path='applied_task'
            element={<AppliedTask />}
          />
          <Route
            path='applied_scenario'
            element={<AppliedScenario />}
          />

          <Route
            path='account'
            element={<Account />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
