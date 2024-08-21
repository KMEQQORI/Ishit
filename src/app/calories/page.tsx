'use client';
import React, { useState } from 'react';
import ProductList from '@/app/products/ProductList.component';
import WithAuth from '@/components/hoc/withAuth';
import WeightCard from '@/app/calories/Weight.component';

const MultiStepForm = () => {
	const [step, setStep] = useState(1);

	// Fonction pour passer à l'étape suivante
	const nextStep = () => {
		setStep(step + 1);
	};

	// Fonction pour revenir à l'étape précédente
	const prevStep = () => {
		if (step > 1) setStep(step - 1);
	};

	// Fonction pour afficher l'étape actuelle
	const renderStep = () => {
		switch (step) {
			case 1:
				return <ProductList nextStep={nextStep} isEdit={false} />;
			case 2:
				return <WeightCard nextStep={nextStep} />;
			default:
				return <ProductList nextStep={nextStep} isEdit={false} />;
		}
	};

	return (
		<div className="w-full flex flex-col items-center justify-between">
			<div className="w-full flex flex-row justify-between">
				<div onClick={prevStep} className="w-2/12 p-4 text-gray-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 19l-7-7 7-7" />
					</svg>
				</div>
				<h1 className="w-8/12 text-center text-gray-600 text-xl m-2">Step {step}</h1>
				<div className="w-2/12"></div>
			</div>
			{renderStep()}
		</div>
	);
};

export default WithAuth(MultiStepForm);
