<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { gsap } from 'gsap';
	import SpinningText from '$lib/components/SpinningText.svelte';
	import GradualTextSpacing from '$lib/components/GradualTextSpacing.svelte';
	import CallToAction from '$lib/components/CallToAction.svelte';
	import type { LinkItem } from '$lib/types';
	import { isMobile } from '$lib/stores/viewport';

	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';

	// --- STATE ---
	let isOpen = $state(false);
	let isAnimating = $state(false);

	// --- ELEMENT REFERENCES ---
	let containerEl = $state<HTMLDivElement>();
	let menuToggleEl = $state<HTMLButtonElement>();
	let menuOverlayEl = $state<HTMLDivElement>();
	let menuContentEl = $state<HTMLDivElement>();
	let menuPreviewImgContainerEl = $state<HTMLDivElement>();
	let menuOpenLabelEl = $state<HTMLParagraphElement>();
	let menuCloseLabelEl = $state<HTMLParagraphElement>();
	let contactButtonEl = $state<HTMLElement>();

	let visionLinksElements = $state<(HTMLAnchorElement | null)[]>([]);
	let socialLinksElements = $state<(HTMLAnchorElement | null)[]>([]);
	let footerLinksElements = $state<(HTMLAnchorElement | null)[]>([]);

	// --- DATA ---
	const visionLinks: LinkItem[] = [
		{
			text: 'Täglich Frisches Obst',
			img: 'taeglichfrischesobst.com.png',
			href: 'https://taeglichfrischesobst.com'
		},
		{
			text: 'NeptunAI',
			img: '/neptunai.tech-dashboard-chat.png',
			images: ['/neptunai.tech-dashboard-chat.png', '/neptunai.tech.png'],
			href: 'https://neptunai.tech'
		},
		{ text: 'OCRMD', img: 'ocrmd.com.png', href: 'https://ocrmd.com' }
	];

	const socialLinks: LinkItem[] = [
		{ text: 'founder on X', href: 'https://x.com/jonasfroeller' },
		{ text: 'ocrmd on X', href: 'https://x.com/ocrmddotcom' }
	];

	const footerLinks: LinkItem[] = [
		{ text: 'MerginIT e.U.', href: '/legal', area: 'lg' },
		{
			text: 'Founder',
			href: 'https://jonasfroeller.is-a.dev',
			icon: 'https://jonasfroeller.is-a.dev/favicon-dark.ico',
			area: 'lg'
		},
		{
			text: 'Open Source Work',
			href: 'https://github.com/MerginIT',
			icon: 'mdi:github',
			area: 'sm'
		}
	];

	const defaultPreviewImageSrc = '/taeglichfrischesobst.com.png';

	// --- UTILITY FUNCTIONS ---
	function resetPreviewImage(): void {
		if (menuPreviewImgContainerEl) {
			menuPreviewImgContainerEl.innerHTML = '';
			const defaultPreviewImg = document.createElement('img');
			defaultPreviewImg.src = defaultPreviewImageSrc;
			defaultPreviewImg.alt = 'Preview Image';
			defaultPreviewImg.className =
				'absolute top-0 left-0 w-full h-full object-cover [will-change:transform,opacity]';
			menuPreviewImgContainerEl.appendChild(defaultPreviewImg);
		}
	}

	function animateMenuToggle(isOpening: boolean): void {
		const openTarget = isOpening ? menuCloseLabelEl : menuOpenLabelEl;
		const closeTarget = isOpening ? menuOpenLabelEl : menuCloseLabelEl;

		if (!openTarget || !closeTarget) return;

		gsap.to(closeTarget, {
			x: isOpening ? -5 : 5,
			y: isOpening ? 10 : -10,
			rotation: isOpening ? 5 : -5,
			opacity: 0,
			duration: 0.5,
			ease: 'power2.out',
			delay: 0.1
		});

		gsap.to(openTarget, {
			x: 0,
			y: 0,
			rotation: 0,
			opacity: 1,
			duration: 0.5,
			ease: 'power2.out',
			delay: 0.25
		});
	}

	// --- MENU ANIMATION FUNCTIONS ---
	function openMenu(): void {
		if (isAnimating || isOpen || !containerEl || !menuContentEl || !menuOverlayEl) return;
		isAnimating = true;

		gsap.to(containerEl, {
			rotation: 10,
			x: 300,
			y: 450,
			scale: 1.5,
			duration: 1.25,
			ease: 'power4.inOut'
		});

		animateMenuToggle(true);

		gsap.to(menuContentEl, {
			rotation: 0,
			x: 0,
			y: 0,
			scale: 1,
			opacity: 1,
			duration: 1.25,
			ease: 'power4.inOut'
		});

		const filteredVisionLinks = visionLinksElements.filter((el) => el !== null) as HTMLElement[];
		const filteredSocialLinks = socialLinksElements.filter((el) => el !== null) as HTMLElement[];
		const filteredFooterLinks = footerLinksElements.filter((el) => el !== null) as HTMLElement[];

		const baseDelay = 0.75;
		const linkAnimDuration = 1;
		const linkStagger = 0.1;

		let subsequentLinksDelay = baseDelay;

		if (filteredVisionLinks.length > 0) {
			gsap.to(filteredVisionLinks, {
				y: '0%',
				opacity: 1,
				duration: linkAnimDuration,
				delay: baseDelay,
				stagger: linkStagger,
				ease: 'power3.out'
			});
			// Calculate delay for the next group: after all vision links finish
			subsequentLinksDelay =
				baseDelay + linkAnimDuration + Math.max(0, filteredVisionLinks.length - 1) * linkStagger;
		}
		// If no vision links, subsequentLinksDelay remains baseDelay,
		// so social/footer links will start then.

		const socialAndFooterCombinedLinks = [...filteredSocialLinks, ...filteredFooterLinks];

		if (socialAndFooterCombinedLinks.length > 0) {
			gsap.set(socialAndFooterCombinedLinks, { opacity: 0, y: '120%' });

			gsap.to(socialAndFooterCombinedLinks, {
				y: '0%',
				opacity: 1,
				duration: linkAnimDuration,
				delay: subsequentLinksDelay,
				stagger: linkStagger,
				ease: 'power3.out'
			});
		}

		gsap.to(menuOverlayEl, {
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			duration: 1.25,
			ease: 'power4.inOut',
			onComplete: () => {
				isOpen = true;
				isAnimating = false;
			}
		});
	}

	function closeMenu(): void {
		if (isAnimating || !isOpen || !containerEl || !menuContentEl || !menuOverlayEl) return;
		isAnimating = true;

		gsap.to(containerEl, {
			rotation: 0,
			x: 0,
			y: 0,
			scale: 1,
			duration: 1.25,
			ease: 'power4.inOut'
		});

		animateMenuToggle(false);

		gsap.to(menuContentEl, {
			rotation: -15,
			x: -100,
			y: -100,
			scale: 1.5,
			opacity: 0.25,
			duration: 1.25,
			ease: 'power4.inOut'
		});

		const allLinks: gsap.DOMTarget = [
			...visionLinksElements,
			...socialLinksElements,
			...footerLinksElements
		].filter((el) => el !== null) as HTMLElement[];

		gsap.to(menuOverlayEl, {
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
			duration: 1.25,
			ease: 'power4.inOut',
			onComplete: () => {
				isOpen = false;
				isAnimating = false;
				if (allLinks.length > 0) {
					gsap.set(allLinks, { y: '120%', opacity: 0.25 });
				}
				resetPreviewImage();
			}
		});
	}

	// --- EVENT HANDLERS ---
	function handleToggleClick(): void {
		if (isOpen) {
			closeMenu();
		} else {
			openMenu();
		}
	}

	function handleLinkHoverFocus(linkItem: LinkItem): void {
		if (!isOpen || isAnimating || !menuPreviewImgContainerEl) return;

		menuPreviewImgContainerEl.innerHTML = '';

		if (linkItem.images && linkItem.images.length > 1) {
			const swiperContainer = document.createElement('div');
			swiperContainer.className = 'swiper w-full h-full opacity-0 [will-change:transform,opacity]';

			gsap.set(swiperContainer, {
				opacity: 0,
				scale: 1.25,
				rotation: 10
			});

			const swiperWrapper = document.createElement('div');
			swiperWrapper.className = 'swiper-wrapper';

			linkItem.images.forEach((imageSrc, index) => {
				const slide = document.createElement('div');
				slide.className = 'swiper-slide';

				const img = document.createElement('img');
				img.src = imageSrc;
				img.alt = `Gallery image ${index + 1}`;
				img.className = 'w-full h-full object-cover [will-change:transform,opacity]';

				slide.appendChild(img);
				swiperWrapper.appendChild(slide);
			});

			const prevButton = document.createElement('div');
			prevButton.className =
				'custom-swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black/60 transition-all duration-300 border border-white/20 hover:border-white/40';
			prevButton.style.width = '40px';
			prevButton.style.height = '40px';
			prevButton.style.minWidth = '40px';
			prevButton.style.minHeight = '40px';

			const nextButton = document.createElement('div');
			nextButton.className =
				'custom-swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black/60 transition-all duration-300 border border-white/20 hover:border-white/40';
			nextButton.style.width = '40px';
			nextButton.style.height = '40px';
			nextButton.style.minWidth = '40px';
			nextButton.style.minHeight = '40px';

			const prevIcon = document.createElement('div');
			prevIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
			prevIcon.style.display = 'flex';
			prevIcon.style.alignItems = 'center';
			prevIcon.style.justifyContent = 'center';
			prevIcon.style.width = '100%';
			prevIcon.style.height = '100%';

			const nextIcon = document.createElement('div');
			nextIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
			nextIcon.style.display = 'flex';
			nextIcon.style.alignItems = 'center';
			nextIcon.style.justifyContent = 'center';
			nextIcon.style.width = '100%';
			nextIcon.style.height = '100%';

			prevButton.appendChild(prevIcon);
			nextButton.appendChild(nextIcon);

			const pagination = document.createElement('div');
			pagination.className = 'swiper-pagination absolute bottom-4 z-10';
			pagination.style.left = '50%';
			pagination.style.transform = 'translateX(-50%)';
			pagination.style.width = 'auto';
			pagination.style.textAlign = 'center';
			pagination.style.display = 'flex';
			pagination.style.justifyContent = 'center';
			pagination.style.alignItems = 'center';

			swiperContainer.appendChild(swiperWrapper);
			swiperContainer.appendChild(prevButton);
			swiperContainer.appendChild(nextButton);
			swiperContainer.appendChild(pagination);
			menuPreviewImgContainerEl.appendChild(swiperContainer);

			import('swiper').then(({ Swiper }) => {
				import('swiper/modules').then(({ Navigation, Pagination, EffectFade }) => {
					const swiper = new Swiper(swiperContainer, {
						modules: [Navigation, Pagination, EffectFade],
						effect: 'slide',
						speed: 400,
						navigation: {
							nextEl: '.custom-swiper-button-next',
							prevEl: '.custom-swiper-button-prev',
							disabledClass: 'swiper-button-disabled-custom'
						},
						pagination: {
							el: pagination,
							clickable: true,
							bulletClass: 'swiper-pagination-bullet',
							bulletActiveClass: 'swiper-pagination-bullet-active',
							type: 'bullets',
							dynamicBullets: false,
							hideOnClick: false,
							renderBullet: function (index: number, className: string) {
								return `<span class="${className}" style="display: inline-block; width: 8px; height: 8px; background: rgba(245, 215, 0, 0.4); border-radius: 50%; margin: 0 6px; cursor: pointer; transition: all 0.3s ease;"></span>`;
							}
						},
						loop: false,
						allowTouchMove: true,
						keyboard: true,
						on: {
							init: function () {
								updateButtonStates(this);
							},
							slideChange: function () {
								updateButtonStates(this);
							}
						}
					});

					function updateButtonStates(swiperInstance: any) {
						const isBeginning = swiperInstance.isBeginning;
						const isEnd = swiperInstance.isEnd;

						if (isBeginning) {
							prevButton.style.opacity = '0.3';
							prevButton.style.cursor = 'not-allowed';
							prevButton.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
							prevButton.style.pointerEvents = 'none';
						} else {
							prevButton.style.opacity = '1';
							prevButton.style.cursor = 'pointer';
							prevButton.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
							prevButton.style.pointerEvents = 'auto';
						}

						if (isEnd) {
							nextButton.style.opacity = '0.3';
							nextButton.style.cursor = 'not-allowed';
							nextButton.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
							nextButton.style.pointerEvents = 'none';
						} else {
							nextButton.style.opacity = '1';
							nextButton.style.cursor = 'pointer';
							nextButton.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
							nextButton.style.pointerEvents = 'auto';
						}
					}

					gsap.to(swiperContainer, {
						opacity: 1,
						scale: 1,
						rotation: 0,
						duration: 0.75,
						ease: 'power2.out'
					});
				});
			});
		} else {
			let imgSrc = linkItem.img;
			if (!imgSrc) return;

			if (!imgSrc.startsWith('/')) {
				imgSrc = '/' + imgSrc;
			}

			const newPreviewImg = document.createElement('img');
			newPreviewImg.src = imgSrc;
			newPreviewImg.alt = 'Preview Image';
			newPreviewImg.className =
				'absolute top-0 left-0 w-full h-full object-cover opacity-0 scale-[1.25] rotate-[10deg] [will-change:transform,opacity]';
			menuPreviewImgContainerEl.appendChild(newPreviewImg);

			gsap.to(newPreviewImg, {
				opacity: 1,
				scale: 1,
				rotation: 0,
				duration: 0.75,
				ease: 'power2.out'
			});
		}
	}

	onMount(() => {
		if (menuCloseLabelEl) {
			gsap.set(menuCloseLabelEl, { opacity: 0, x: -5, y: 10, rotation: 5 });
		}
		if (menuOpenLabelEl) {
			gsap.set(menuOpenLabelEl, { opacity: 1, x: 0, y: 0, rotation: 0 });
		}
		if (menuContentEl) {
			gsap.set(menuContentEl, {
				x: -100,
				y: -100,
				scale: 1.5,
				rotation: -15,
				opacity: 0.25
			});
		}
		const allLinksOnInit: gsap.DOMTarget = [
			...visionLinksElements,
			...socialLinksElements,
			...footerLinksElements
		].filter((el) => el !== null) as HTMLElement[];

		if (allLinksOnInit.length > 0) {
			gsap.set(allLinksOnInit, { y: '120%', opacity: 0.25 });
		}
		resetPreviewImage();

		if (contactButtonEl) {
			gsap.set(contactButtonEl, { xPercent: -105, opacity: 0 });
			gsap.to(contactButtonEl, {
				xPercent: 0,
				opacity: 1,
				duration: 1.5,
				ease: 'expo.out',
				delay: 2.37
			});
		}
	});
</script>

<div class="font-custom bg-brand-dark text-white leading-normal overflow-hidden">
	<nav
		class="fixed top-0 inset-x-0 p-10 flex justify-between items-center z-[100] text-white"
	>
		<div class="logo">
			<a href="/" class="font-semibold text-[1.5rem] flex items-center">
				<img src="/favicon.png" alt="MerginIT Favicon" class="h-[calc(1.5rem*1.5)] mr-2" />
				MerginIT
			</a>
		</div>
		<button
			type="button"
			bind:this={menuToggleEl}
			onclick={handleToggleClick}
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
			class="menu-toggle relative w-24 h-6 cursor-pointer overflow-hidden p-0 bg-transparent border-none text-inherit"
		>
			<p
				bind:this={menuOpenLabelEl}
				class="absolute top-0 left-0 w-full h-full text-right font-normal origin-top-left flex items-center justify-end [will-change:transform,opacity]"
			>
				References
			</p>
			<p
				bind:this={menuCloseLabelEl}
				class="absolute top-0 left-0 w-full h-full text-right font-normal origin-top-left flex items-center justify-end [will-change:transform,opacity]"
			>
				Close
			</p>
		</button>
	</nav>

	<div
		bind:this={menuOverlayEl}
		class="menu-overlay fixed inset-0 bg-brand-dark z-50 overflow-hidden"
		style="clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);"
	>
		<div
			bind:this={menuContentEl}
			class="menu-content relative w-full h-full flex flex-col justify-center items-center origin-left-bottom [will-change:transform,opacity]"
		>
			<div
				class="menu-items w-full p-10 flex md:flex-row flex-col gap-10 flex-grow items-center md:pt-0 pt-32 max-md:pt-[8rem] bg-brand-dark"
			>
				<div class="col-lg md:flex-[3] hidden md:block w-[45%] h-full max-h-[600px]">
					<div
						bind:this={menuPreviewImgContainerEl}
						class="menu-preview-img relative w-full h-full overflow-hidden"
					></div>
				</div>
				<div class="col-sm md:flex-[2] w-full md:w-auto">
					<div class="menu-links flex flex-col gap-2">
						{#each visionLinks as item, i}
							<div class="link">
								<a
									bind:this={visionLinksElements[i]}
									href={item.href}
									target="_blank"
									rel="noopener noreferrer"
									onmouseover={() => handleLinkHoverFocus(item)}
									onfocus={() => handleLinkHoverFocus(item)}
									class="text-[2.5rem] md:text-[3.5rem] font-medium tracking-[-0.02em] relative inline-block transition-colors duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-neutral-400 group menu-link-item [will-change:transform]"
								>
									{item.text}
									<span
										class="absolute left-0 bottom-0 h-[2px] bg-white w-full scale-x-0 origin-left group-hover:scale-x-100 group-hover:origin-right transition-transform duration-300 ease-[cubic-bezier(0.6,0,0.4,1)] hidden md:inline-block max-md:hidden"
									></span>
								</a>
							</div>
						{/each}
					</div>
					<div class="menu-socials flex flex-col gap-2 mt-8 md:mt-4">
						{#each socialLinks as item, i}
							<div class="social">
								<a
									bind:this={socialLinksElements[i]}
									href={item.href}
									target="_blank"
									rel="noopener noreferrer"
									class="text-base font-light text-neutral-500 relative inline-block transition-colors duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white group menu-link-item [will-change:transform]"
								>
									{item.text}
								</a>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div
				class="menu-footer absolute bottom-0 w-full p-10 flex md:flex-row flex-col gap-4 text-[0.9rem] max-md:gap-[1rem]"
			>
				<div class="col-lg md:flex-[3]">
					{#if footerLinks[0]}
						<a
							bind:this={footerLinksElements[0]}
							href={footerLinks[0].href}
							class="relative transition-colors duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-neutral-400 group menu-link-item [will-change:transform] {footerLinks[0]
								.icon && footerLinks[0].text
								? 'inline-flex items-center'
								: 'inline-block'}"
						>
							{#if footerLinks[0].icon && footerLinks[0].text}
								<span>{footerLinks[0].text}</span>
								{#if footerLinks[0].icon.startsWith('http') || footerLinks[0].icon.startsWith('/')}
									<img
										src={footerLinks[0].icon}
										alt=""
										class="ml-1 w-6 h-6 rounded-full object-contain"
									/>
								{:else}
									<Icon icon={footerLinks[0].icon} inline={true} class="ml-1 w-6 h-6" />
								{/if}
							{:else if footerLinks[0].icon}
								{#if footerLinks[0].icon.startsWith('http') || footerLinks[0].icon.startsWith('/')}
									<img
										src={footerLinks[0].icon}
										alt={footerLinks[0].text || 'MerginIT e.U. icon'}
										class="w-6 h-6 rounded-full object-contain"
									/>
								{:else}
									<Icon icon={footerLinks[0].icon} />
								{/if}
							{:else if footerLinks[0].text}
								{footerLinks[0].text}
							{/if}
						</a>
					{/if}
				</div>
				<div
					class="col-sm md:flex-[2] flex flex-col md:flex-row md:justify-between items-start md:gap-0 gap-2 max-md:gap-[0.5rem] max-md:items-start"
				>
					{#if footerLinks[1]}
						<a
							bind:this={footerLinksElements[1]}
							href={footerLinks[1].href}
							class="relative transition-colors duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-neutral-400 group menu-link-item [will-change:transform] {footerLinks[1]
								.icon && footerLinks[1].text
								? 'inline-flex items-center'
								: 'inline-block'}"
						>
							{#if footerLinks[1].icon && footerLinks[1].text}
								{#if footerLinks[1].icon.startsWith('http') || footerLinks[1].icon.startsWith('/')}
									<img
										src={footerLinks[1].icon}
										alt=""
										class="mr-1 w-6 h-6 rounded-full object-contain"
									/>
								{:else}
									<Icon icon={footerLinks[1].icon} inline={true} class="mr-1 w-6 h-6" />
								{/if}
								<span>{footerLinks[1].text}</span>
							{:else if footerLinks[1].icon}
								{#if footerLinks[1].icon.startsWith('http') || footerLinks[1].icon.startsWith('/')}
									<img
										src={footerLinks[1].icon}
										alt={footerLinks[1].text || 'Founder icon'}
										class="w-6 h-6 rounded-full object-contain"
									/>
								{:else}
									<Icon icon={footerLinks[1].icon} class="w-6 h-6" />
								{/if}
							{:else if footerLinks[1].text}
								{footerLinks[1].text}
							{/if}
						</a>
					{/if}
					{#if footerLinks[2]}
						<a
							bind:this={footerLinksElements[2]}
							href={footerLinks[2].href}
							class="relative transition-colors duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-neutral-400 group menu-link-item [will-change:transform] {footerLinks[2]
								.icon && footerLinks[2].text
								? 'inline-flex items-center'
								: 'inline-block'}"
						>
							{#if footerLinks[2].icon && footerLinks[2].text}
								<span>{footerLinks[2].text}</span>
								{#if footerLinks[2].icon.startsWith('http') || footerLinks[2].icon.startsWith('/')}
									<img
										src={footerLinks[2].icon}
										alt=""
										class="ml-1 w-6 h-6 rounded-full object-contain"
									/>
								{:else}
									<Icon icon={footerLinks[2].icon} inline={true} class="ml-1 w-6 h-6" />
								{/if}
							{:else if footerLinks[2].icon}
								{#if footerLinks[2].icon.startsWith('http') || footerLinks[2].icon.startsWith('/')}
									<img
										src={footerLinks[2].icon}
										alt={footerLinks[2].text || 'Open Source Work icon'}
										class="w-6 h-6 rounded-full object-contain"
									/>
								{:else}
									<Icon icon={footerLinks[2].icon} class="w-6 h-6" />
								{/if}
							{:else if footerLinks[2].text}
								{footerLinks[2].text}
							{/if}
						</a>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div
		bind:this={containerEl}
		class="container relative w-full min-h-screen origin-right-top [will-change:transform]"
	>
		<section
			class="hero relative w-full h-dvh p-10 flex flex-col justify-end items-start overflow-hidden"
		>
			<div class="hero-img absolute top-0 left-0 w-full h-full -z-10">
				<img
					src="cyberpunk-city.webp"
					alt="Hero Background"
					class="w-full h-full object-cover brightness-75"
				/>
			</div>
			<CallToAction
				href="mailto:jonas@merginit.com"
				text="Contact Us"
				class="mb-4"
				bind:element={contactButtonEl}
			/>
			<GradualTextSpacing
				words={$isMobile
					? 'We merge<br>features<br>into reality,<br>one iteration<br>at a time.'
					: 'We merge features into reality,<br>one iteration at a time.'}
				class="font-display text-left text-4xl font-bold tracking-[-0.1em] text-white md:text-7xl md:leading-[5rem] w-full md:w-4/5"
			/>
			<div class="absolute bottom-10 right-10">
				<SpinningText children="We Build SaaS • We Build Websites • " radius={6.8} />
			</div>
		</section>
	</div>
</div>

<style>
	.menu-link-item {
		transform: translateY(120%);
		opacity: 0.25;
	}
	.menu-toggle {
		padding: 0;
		background: transparent;
		border: none;
		color: inherit;
	}

	.swiper-button-next,
	.swiper-button-prev {
		display: none !important;
	}

	.custom-swiper-button-prev,
	.custom-swiper-button-next {
		display: flex !important;
	}

	.swiper-pagination {
		position: absolute !important;
		bottom: 16px !important;
		left: 50% !important;
		transform: translateX(-50%) !important;
		width: auto !important;
		text-align: center !important;
		display: flex !important;
		justify-content: center !important;
		align-items: center !important;
	}

	.swiper-pagination-bullet {
		background: rgba(245, 215, 0, 0.4) !important;
		opacity: 1 !important;
		width: 8px !important;
		height: 8px !important;
		margin: 0 6px !important;
		transition: all 0.3s ease !important;
	}

	.swiper-pagination-bullet-active {
		background: #f5d700 !important;
		transform: scale(1.25) !important;
	}

	.swiper-pagination-bullet:hover {
		background: rgba(245, 215, 0, 0.7) !important;
	}
</style>
