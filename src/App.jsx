import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewUserLanding from './pages/NewUserPages/CalibrationAssessment/Landing';
import CareerInterest from './pages/NewUserPages/CalibrationAssessment/CareerInterest';
import RecommendCareerInterest from './pages/NewUserPages/CalibrationAssessment/RecommendCareerInterest';
import MbtiPersonalityCheck from './pages/NewUserPages/CalibrationAssessment/MbtiPersonalityCheck';
import NewUserLayout from './layouts/NewUserLayout';
import Pathways from './pages/AuthUserPages/Upskill/Landing';
import AuthUserLayout from './layouts/AuthUserLayout';
import InterviewPracticeLanding from './pages/AuthUserPages/InterviewPractice/Landing';
import ResumeBuilderLanding from './pages/AuthUserPages/ResumeBuilder/Landing';
import Applied from './pages/Applied';
import SoftwareEngineerModuleOne from './pages/AuthUserPages/Upskill/SEPath/ModuleOne';
import ResumeDetails from './pages/AuthUserPages/ResumeBuilder/Details';
import SoftwareEngineerPath from './pages/AuthUserPages/Upskill/SEPath/SoftwareEngineerPath';
import Skills from './pages/AuthUserPages/ResumeBuilder/Skills';

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
            element={<InterviewPracticeLanding />}
          />
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
            path='applied'
            element={<Applied />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
