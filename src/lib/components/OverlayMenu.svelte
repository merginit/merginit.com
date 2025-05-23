<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from "@iconify/svelte";
  import { gsap } from 'gsap';
  import SpinningText from '$lib/components/SpinningText.svelte';
  import NumberTicker from '$lib/components/NumberTicker.svelte';
  import GradualTextSpacing from '$lib/components/GradualTextSpacing.svelte';
	import FancyText from './FancyText.svelte';
  import BorderBeam from "./BorderBeam.svelte";
  import CallToAction from '$lib/components/CallToAction.svelte';

  // --- TYPE DEFINITIONS ---
  interface LinkItem {
    href: string;
    text?: string;
    icon?: string;
    img?: string;
    area?: 'lg' | 'sm';
  }

  interface ProjectItem {
    projectType: string;
    category: string;
    date: string;
    datetime: string;
    mainTech: string;
    description: string;
    iconSrc: string;
    url: string;
    productName: string;
  }

  // --- STATE ---
  let isOpen: boolean = false;
  let isAnimating: boolean = false;

  // --- ELEMENT REFERENCES ---
  let containerEl: HTMLDivElement | undefined;
  let menuToggleEl: HTMLButtonElement | undefined;
  let menuOverlayEl: HTMLDivElement | undefined;
  let menuContentEl: HTMLDivElement | undefined;
  let menuPreviewImgContainerEl: HTMLDivElement | undefined;
  let menuOpenLabelEl: HTMLParagraphElement | undefined;
  let menuCloseLabelEl: HTMLParagraphElement | undefined;
  let contactButtonEl: HTMLElement | undefined;

  let visionLinksElements: (HTMLAnchorElement | null)[] = [];
  let socialLinksElements: (HTMLAnchorElement | null)[] = [];
  let footerLinksElements: (HTMLAnchorElement | null)[] = [];

  // --- DATA ---
  const visionLinks: LinkItem[] = [
    { text: 'Täglich Frisches Obst', img: 'taeglichfrischesobst.com.png', href: 'https://taeglichfrischesobst.com' },
    { text: 'NeptunAI', img: '/neptunai.tech-dashboard-chat.png', href: 'https://neptunai.tech' },
    { text: 'OCRMD', img: 'ocrmd.com.png', href: 'https://ocrmd.com' }
  ];

  const socialLinks: LinkItem[] = [
    { text: 'founder on X', href: 'https://x.com/jonasfroeller' },
    { text: 'ocrmd on X', href: 'https://x.com/ocrmddotcom' },
  ];

  const footerLinks: LinkItem[] = [
    { text: 'MerginIT e.U.', href: '/legal', area: 'lg' },
    { text: 'Founder', href: 'https://jonasfroeller.is-a.dev', icon: 'https://jonasfroeller.is-a.dev/favicon-dark.ico', area: 'lg' },
    { text: 'Open Source Work', href: 'https://github.com/MerginIT', icon: 'mdi:github', area: 'sm' },
  ];

  const legalPageLinks: LinkItem[] = [
    { text: 'Imprint', href: '/legal/imprint' },
    { text: 'Privacy Policy', href: '/legal/privacy-policy' },
    /* { text: 'Terms of Service', href: '/legal/tos' }, */
  ];

  const defaultPreviewImageSrc = '/taeglichfrischesobst.com.png';

  const projects: ProjectItem[] = [
    {
      projectType: "SaaS Website",
      category: "OCR Solution",
      productName: "OCRMD",
      date: "2025",
      datetime: "2025-01-01",
      mainTech: "React",
      description: "OCRMD.com transforms scanned images and PDFs into editable Markdown. Features include AI-enhanced text recognition with formatting, math equations, tables, and image detection at 90-99% accuracy. Secure cloud storage and full-text search capabilities make your documents accessible anywhere.",
      iconSrc: 'https://ocrmd.com/favicon.png',
      url: 'https://ocrmd.com'
    },
    {
      projectType: "Open Source Website & AI",
      category: "Configuration Platform",
      productName: "NeptunAI",
      date: "2024-2025",
      datetime: "2024-01-01",
      mainTech: "Nuxt",
      description: "NeptunAI is a comprehensive configuration platform combining a CLI tool, WebUI, and AI trained on CICD and web development technologies to streamline your configuration workflow.",
      iconSrc: 'https://neptunai.tech/favicon.png',
      url: 'https://neptunai.tech'
    },
    {
      projectType: "Website",
      category: "Indie-Pop Band",
      productName: "Täglich frisches Obst",
      date: "2023",
      datetime: "2023-01-01",
      mainTech: "SvelteKit",
      description: "Founded in 2022, this Linz-based indie-pop band blends funk, rock, and jazz elements into their unique sound. The five-piece band has released multiple singles and built a dedicated following through their distinctive style and energetic live performances.",
      iconSrc: 'https://taeglichfrischesobst.com/assets/images/fruit.png',
      url: 'https://taeglichfrischesobst.com'
    }
  ];

  // --- UTILITY FUNCTIONS ---
  function cleanupPreviewImages(): void {
    if (!menuPreviewImgContainerEl) return;
    const previewImages: NodeListOf<HTMLImageElement> =
      menuPreviewImgContainerEl.querySelectorAll('img');
    if (previewImages.length > 3) {
      for (let i = 0; i < previewImages.length - 3; i++) {
        if (previewImages[i]) {
             menuPreviewImgContainerEl.removeChild(previewImages[i]);
        }
      }
    }
  }

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
      delay: 0.1,
    });

    gsap.to(openTarget, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.25,
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
      ease: 'power4.inOut',
    });

    animateMenuToggle(true);

    gsap.to(menuContentEl, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.25,
      ease: 'power4.inOut',
    });

    const filteredVisionLinks = visionLinksElements.filter(el => el !== null) as HTMLElement[];
    const filteredSocialLinks = socialLinksElements.filter(el => el !== null) as HTMLElement[];
    const filteredFooterLinks = footerLinksElements.filter(el => el !== null) as HTMLElement[];

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
        ease: 'power3.out',
      });
      // Calculate delay for the next group: after all vision links finish
      subsequentLinksDelay = baseDelay + 
                             linkAnimDuration + 
                             Math.max(0, filteredVisionLinks.length - 1) * linkStagger;
    }
    // If no vision links, subsequentLinksDelay remains baseDelay, 
    // so social/footer links will start then.

    const socialAndFooterCombinedLinks = [...filteredSocialLinks, ...filteredFooterLinks];

    if (socialAndFooterCombinedLinks.length > 0) {
      // Set initial state for these links for their animation sequence
      gsap.set(socialAndFooterCombinedLinks, { opacity: 0, y: '120%' }); 
      
      gsap.to(socialAndFooterCombinedLinks, {
        y: '0%',
        opacity: 1,
        duration: linkAnimDuration,
        delay: subsequentLinksDelay,
        stagger: linkStagger,
        ease: 'power3.out',
      });
    }

    gsap.to(menuOverlayEl, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.25,
      ease: 'power4.inOut',
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
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
      ease: 'power4.inOut',
    });

    animateMenuToggle(false);

    gsap.to(menuContentEl, {
      rotation: -15,
      x: -100,
      y: -100,
      scale: 1.5,
      opacity: 0.25,
      duration: 1.25,
      ease: 'power4.inOut',
    });

    const allLinks: gsap.DOMTarget = [
      ...visionLinksElements,
      ...socialLinksElements,
      ...footerLinksElements,
    ].filter(el => el !== null) as HTMLElement[];

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
      },
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

  function handleLinkHoverFocus(imgSrc?: string): void {
    if (!isOpen || isAnimating || !imgSrc || !menuPreviewImgContainerEl) return;

    const currentImages: NodeListOf<HTMLImageElement> =
      menuPreviewImgContainerEl.querySelectorAll('img');
    if (currentImages.length > 0) {
      const lastImage = currentImages[currentImages.length - 1];
      if (lastImage && lastImage.src && lastImage.src.endsWith(imgSrc)) {
        return;
      }
    }

    const newPreviewImg = document.createElement('img');
    newPreviewImg.src = imgSrc;
    newPreviewImg.alt = 'Preview Image';
    newPreviewImg.className =
      'absolute top-0 left-0 w-full h-full object-cover opacity-0 scale-[1.25] rotate-[10deg] [will-change:transform,opacity]';
    menuPreviewImgContainerEl.appendChild(newPreviewImg);
    cleanupPreviewImages();

    gsap.to(newPreviewImg, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.75,
      ease: 'power2.out',
    });
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
        x: -100, y: -100, scale: 1.5, rotation: -15, opacity: 0.25,
      });
    }
    const allLinksOnInit: gsap.DOMTarget = [
      ...visionLinksElements,
      ...socialLinksElements,
      ...footerLinksElements,
    ].filter(el => el !== null) as HTMLElement[];

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
        delay: 0.5,
      });
    }
  });
</script>

<div class="font-custom bg-brand-dark text-white leading-normal overflow-hidden">
  <nav
    class="fixed top-0 left-0 w-screen p-10 flex justify-between items-center z-[100] text-white"
  >
    <div class="logo">
      <a href="/" class="font-semibold text-[1.5rem] flex items-center">
        <img src="/favicon.png" alt="merginIT Favicon" class="h-[calc(1.5rem*1.5)] mr-2" />
        merginIT
      </a>
    </div>
    <button
      type="button"
      bind:this={menuToggleEl}
      on:click={handleToggleClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      class="menu-toggle relative w-16 h-6 cursor-pointer overflow-hidden p-0 bg-transparent border-none text-inherit"
    >
      <p
        bind:this={menuOpenLabelEl}
        class="absolute top-0 left-0 w-full h-full text-right font-normal origin-top-left flex items-center justify-end [will-change:transform,opacity]"
      >
        Work
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
    class="menu-overlay fixed top-0 left-0 w-screen h-dvh bg-brand-dark z-50 overflow-hidden"
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
                  target="_blank" rel="noopener noreferrer"
                  on:mouseover={() => handleLinkHoverFocus(item.img)}
                  on:focus={() => handleLinkHoverFocus(item.img)}
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
                  target="_blank" rel="noopener noreferrer"
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
            class="relative transition-colors duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-neutral-400 group menu-link-item [will-change:transform] {footerLinks[0].icon && footerLinks[0].text ? 'inline-flex items-center' : 'inline-block'}"
          >
            {#if footerLinks[0].icon && footerLinks[0].text}
              <span>{footerLinks[0].text}</span>
              {#if (footerLinks[0].icon.startsWith('http') || footerLinks[0].icon.startsWith('/'))}
                <img src={footerLinks[0].icon} alt="" class="ml-1 w-6 h-6 rounded-full object-contain" />
              {:else}
                <Icon icon={footerLinks[0].icon} inline={true} class="ml-1 w-6 h-6" />
              {/if}
            {:else if footerLinks[0].icon}
              {#if (footerLinks[0].icon.startsWith('http') || footerLinks[0].icon.startsWith('/'))}
                <img src={footerLinks[0].icon} alt={footerLinks[0].text || 'MerginIT e.U. icon'} class="w-6 h-6 rounded-full object-contain" />
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
            class="relative transition-colors duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-neutral-400 group menu-link-item [will-change:transform] {footerLinks[1].icon && footerLinks[1].text ? 'inline-flex items-center' : 'inline-block'}"
          >
            {#if footerLinks[1].icon && footerLinks[1].text}
              {#if (footerLinks[1].icon.startsWith('http') || footerLinks[1].icon.startsWith('/'))}
                <img src={footerLinks[1].icon} alt="" class="mr-1 w-6 h-6 rounded-full object-contain" />
              {:else}
                <Icon icon={footerLinks[1].icon} inline={true} class="mr-1 w-6 h-6" />
              {/if}
              <span>{footerLinks[1].text}</span>
            {:else if footerLinks[1].icon}
              {#if (footerLinks[1].icon.startsWith('http') || footerLinks[1].icon.startsWith('/'))}
                <img src={footerLinks[1].icon} alt={footerLinks[1].text || 'Founder icon'} class="w-6 h-6 rounded-full object-contain" />
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
            class="relative transition-colors duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-neutral-400 group menu-link-item [will-change:transform] {footerLinks[2].icon && footerLinks[2].text ? 'inline-flex items-center' : 'inline-block'}"
          >
            {#if footerLinks[2].icon && footerLinks[2].text}
              <span>{footerLinks[2].text}</span>
              {#if (footerLinks[2].icon.startsWith('http') || footerLinks[2].icon.startsWith('/'))}
                <img src={footerLinks[2].icon} alt="" class="ml-1 w-6 h-6 rounded-full object-contain" />
              {:else}
                <Icon icon={footerLinks[2].icon} inline={true} class="ml-1 w-6 h-6" />
              {/if}
            {:else if footerLinks[2].icon}
              {#if (footerLinks[2].icon.startsWith('http') || footerLinks[2].icon.startsWith('/'))}
                <img src={footerLinks[2].icon} alt={footerLinks[2].text || 'Open Source Work icon'} class="w-6 h-6 rounded-full object-contain" />
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
    <section class="hero relative w-screen h-dvh p-10 flex flex-col justify-end items-start overflow-hidden">
      <div class="hero-img absolute top-0 left-0 w-full h-full -z-10">
        <img src="cyberpunk-city.png" alt="Hero Background" class="w-full h-full object-cover brightness-75" />
      </div>
      <CallToAction href="mailto:jonas@merginit.com" text="Contact Us" class="mb-4" bind:element={contactButtonEl} />
      <GradualTextSpacing
        words="We merge features into reality,<br>one iteration at a time."
        class="font-display text-left text-4xl font-bold tracking-[-0.1em] text-white md:text-7xl md:leading-[5rem] w-full md:w-4/5"
      />
      <div class="absolute bottom-10 right-10">
        <SpinningText children="We Build SaaS • We Build Websites • " radius={6.8} />
      </div>
    </section>
  </div>
  <div class="min-h-screen bg-brand-dark flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
    <section class="ml-auto pt-16">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-9xl font-bold tracking-tighter">
        <FancyText>merginIT</FancyText> e.U.
      </h1>
    </section>
    <section class="flex flex-col items-center md:flex-row md:items-baseline gap-3">
      <div class="whitespace-pre-wrap text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-medium tracking-tighter text-white">
        <NumberTicker value={3} initial={0} duration={1500} />
      </div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center text-white mt-4">Websites Built</h2>
    </section>
    <section class="bg-brand-dark flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-20">
      <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-[#ffaa40] mb-12 sm:mb-16 text-center tracking-tight">
        Our Projects
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {#each projects as project, i}
          <article class="group relative flex h-full flex-col items-start justify-between rounded-3xl p-6 sm:p-7 border border-gray-700/70 bg-blue-950/10 backdrop-blur-md shadow-xl hover:shadow-brand-accent/40 transition-all duration-300 ease-in-out hover:border-brand-accent/70 transform hover:-translate-y-1">
            <BorderBeam size={180} duration={10} delay={i * 0.2} anchor={ [10, 45, 80][i % 3] } class="absolute top-0 left-0 w-full h-full z-0 opacity-30 group-hover:opacity-60 transition-opacity" />
  
            <a href={project.url} target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-20" aria-label={"View " + project.projectType}></a>
  
            <div class="relative z-10 flex w-full items-center justify-between gap-x-4 text-xs">
              <time datetime={project.datetime} class="text-gray-400">{project.date}</time>
              <span class="cursor-default relative z-30 rounded-full bg-gray-800/80 px-3 py-1.5 font-medium text-brand-accent border border-gray-400/60 shadow-sm">
                {project.mainTech}
              </span>
            </div>
  
            <div class="relative z-10 mt-4 flex-grow">
              <h3 class="text-xl font-semibold leading-7 text-gray-100 group-hover:text-white transition-colors">
                {project.productName} 
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors line-clamp-6">
                {project.description}
              </p>
            </div>
  
            <div class="relative z-10 mt-6 flex items-center gap-x-4 w-full pt-4 border-t border-gray-700/50">
              <img
                src={project.iconSrc}
                alt={`${project.projectType} favicon`}
                class="h-10 w-10 rounded-full bg-gray-700 p-1 object-contain border border-gray-600 shadow"
              />
              <div class="text-sm leading-5">
                <p class="font-semibold text-gray-200 group-hover:text-white transition-colors">
                  {project.category} 
                </p>
                <p class="text-gray-400 group-hover:text-gray-300 transition-colors text-xs">
                  {project.projectType}
                </p>
              </div>
            </div>
          </article>
        {/each}
      </div>
    </section>
  </div>

  <footer class="w-full bg-brand-dark py-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-t border-gray-700/50 text-center">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
      {#each legalPageLinks as link}
        <a href={link.href} class="text-sm text-neutral-400 hover:text-neutral-200 transition-colors duration-300">
          {link.text}
        </a>
      {/each}
    </div>
    <p class="text-xs text-neutral-500 mt-6">
      &copy; {new Date().getFullYear()} merginIT e.U. All rights reserved.
    </p>
  </footer>
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
</style>
