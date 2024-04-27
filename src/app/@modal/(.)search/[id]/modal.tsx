'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type ElementRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const dialogRef = useRef<ElementRef<'dialog'>>(null);

	useEffect(() => {
		if (!dialogRef.current?.open) {
			dialogRef.current?.showModal();
		}
	}, []);

	function onDismiss() {
		router.back();
	}

	const modalRoot = document.getElementById('modal-root');
	if (!modalRoot) {
		throw new Error('Modal root element not found');
	}

	return createPortal(
		<div className='absolute bg-black flex z-50 shadow-lg'>
			<dialog
				ref={dialogRef}
				className='relative rounded-md w-8/12 p-9'
				onClose={onDismiss}
			>
				{children}
				<div className='absolute top-3 right-3 cursor-pointer'>
					<X onClick={onDismiss} />
				</div>
			</dialog>
		</div>,
		modalRoot,
	);
}
