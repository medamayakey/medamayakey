'use client';
import { useApp } from '@/contexts/AppContext';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { LogIn, NotebookPen, Search, SmilePlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/logo.svg';
import { Button } from './ui/button';

export default function Header() {
	const { addedRecipes } = useApp();

	return (
		<header className='flex bg-slate-50 h-16 px-6'>
			<div className='flex w-full justify-between items-center'>
				<div className='logo'>
					<Link href='/'>
						<Image src={Logo} alt='Fridgefy' width={144} height={40} />
					</Link>
				</div>
				<nav>
					<ul className='flex items-center gap-6'>
						<li>
							<Link href='/'>
								<span className='mr-2'>
									<SmilePlus />
								</span>
								<span>Home</span>
							</Link>
						</li>
						<li>
							<Link href='/search'>
								<span className='mr-2'>
									<Search />
								</span>
								<span>Search</span>
							</Link>
						</li>
						<SignedIn>
							<li className='relative'>
								<Link href='/myrecipes'>
									<span className='mr-2'>
										<NotebookPen />
									</span>
									<span>My Recipes</span>
									{addedRecipes.length > 0 && (
										<span className='absolute -top-2 -left-2 bg-orange-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center'>
											{addedRecipes.length}
										</span>
									)}
								</Link>
							</li>
						</SignedIn>
						<SignedOut>
							<li>
								<SignInButton redirectUrl='/' mode='modal'>
									<Button className='flex items-center '>
										<LogIn className='mr-2' />
										Sign In
									</Button>
								</SignInButton>
							</li>
						</SignedOut>
						<SignedIn>
							<li>
								<UserButton afterSignOutUrl='/' />
							</li>
						</SignedIn>
					</ul>
				</nav>
			</div>
		</header>
	);
}
