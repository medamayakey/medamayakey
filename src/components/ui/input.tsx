import { cn } from '@/lib/utils';
import { type InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	icon?: JSX.Element;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon, ...props }, ref) => {
		return (
			<div className='relative'>
				{icon && (
					<div className='absolute inset-y-0 left-3 flex items-center'>
						{icon}
					</div>
				)}

				<input
					type={type}
					className={cn(
						'flex h-10 w-full rounded-md border border-slate-300 bg-background px-3 py-2 file:border-0 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
						className,
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input };
