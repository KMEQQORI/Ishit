
'use client';
import React from 'react';
import WithAuth from '@/components/hoc/withAuth';

function Calculator() {
	return (
		<div style={{ padding: '64px' }}>
			test
		</div>
	);
}

export default WithAuth(Calculator);
