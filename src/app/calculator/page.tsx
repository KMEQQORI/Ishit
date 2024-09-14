'use client';
import React from 'react';
import WithAuth from '@/components/hoc/withAuth';
import { ReactCalculator } from 'react-calculator-ts';

function Calculator() {
	return (
		<div style={{ padding: '64px' }}>
			<ReactCalculator
				type={'scientific'}
				numberButtonColor={'#4b5563'}
				operationButtonColor={'#ef4444'}
				equalButtonColor={'#10b981'}
				clearButtonColor={'#f59e0b'}
			/>
		</div>
	);
}

export default WithAuth(Calculator);
