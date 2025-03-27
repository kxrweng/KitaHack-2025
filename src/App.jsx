import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewUserLanding from "./pages/CalibrationAssessment/Landing";
import CareerInterest from "./pages/CalibrationAssessment/CareerInterest";
import RecommendCareerInterest from "./pages/CalibrationAssessment/RecommendCareerInterest";
import MbtiPersonalityCheck from "./pages/CalibrationAssessment/MbtiPersonalityCheck";
import NewUserLayout from "./layouts/NewUserLayout";
import AuthUserLanding from "./pages/Upskill/Landing";
import AuthUserLayout from "./layouts/AuthUserLayout";
import InterviewPracticeLanding from "./pages/InterviewPractice/Landing";
import ResumeBuilderLanding from "./pages/ResumeBuilder/Landing";
import AppliedTask from "./pages/Upskill/AppliedTask"
import AppliedScenario from "./pages/Upskill/AppliedScenario"

import { Navigate } from "react-router-dom";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Navigate
							to="/new_user/landing"
							replace
						/>
					}
				/>

				<Route
					path="/new_user"
					element={<NewUserLayout />}
				>
					<Route
						path="landing"
						element={<NewUserLanding />}
					/>
					<Route
						path="career_interest"
						element={<CareerInterest />}
					/>
					<Route
						path="mbti_personality_check"
						element={<MbtiPersonalityCheck />}
					/>
					<Route
						path="recommended_career_interest"
						element={<RecommendCareerInterest />}
					/>
				</Route>

				<Route
					path="/auth_user"
					element={<AuthUserLayout />}
				>
					<Route
						path="landing"
						element={<AuthUserLanding />}
					/>

					<Route
						path="interview_practice"
						element={<InterviewPracticeLanding />}
					/>
					<Route
						path="resume_builder"
						element={<ResumeBuilderLanding />}
					/>

					<Route 
						path ="applied_task" 
						element = {<AppliedTask />}
					/>
					<Route 
						path ="applied_scenario" 
						element = {<AppliedScenario />}
					/>
						
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
