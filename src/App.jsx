import "./App.css";
import Home from "./pages/MainPage/Home";
import AboutUs from "./pages/MainPage/AboutUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import NewUserLanding from "./pages/CalibrationAssessment/Landing";
import CareerInterest from "./pages/CalibrationAssessment/CareerInterest";
import RecommendCareerInterest from "./pages/CalibrationAssessment/RecommendCareerInterest";
import MbtiPersonalityCheck from "./pages/CalibrationAssessment/MbtiPersonalityCheck";
import NewUserLayout from "./layouts/NewUserLayout";
import AuthUserLanding from "./pages/Upskill/Landing";
import AuthUserLayout from "./layouts/AuthUserLayout";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/new_user"
					element={<NewUserLayout />}
				>
					<Route
						index
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
						index
						element={<AuthUserLanding />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
