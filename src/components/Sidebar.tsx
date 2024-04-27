'use client';
import { getFridgeItems } from '@/actions/db/firebase/firestore';
import { columns } from '@/components/fridgeItem/columns';
import { DataTable } from '@/components/fridgeItem/dataTable';
import { useApp } from '@/contexts/AppContext';
import { useCallback, useEffect } from 'react';

export default function Sidebar() {
	const { fridgeItems, setFridgeItems } = useApp();

	const fetchFridgeItems = useCallback(async () => {
		try {
			const items = await getFridgeItems();

			setFridgeItems(items);
		} catch (error) {
			console.error('Error fetching fridge items:', error);
		}
	}, []);

	useEffect(() => {
		fetchFridgeItems();
	}, [fetchFridgeItems]);

	return (
		<aside className='min-w-72 bg-slate-50 p-6'>
			<div>
				<DataTable columns={columns} data={fridgeItems} />
			</div>
		</aside>
	);
}
