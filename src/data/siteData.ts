export interface SocialLink {
  social: string;
  icon: string;
  para: string;
  hrf: string;
}

export interface SushikshaItem {
  id: string;
  images: string;
  alt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  image: string;
  description: string;
  summary: string;
  readTime: string;
  content: string;
}

export const siteConfig = {
  title: "Rishabh Naik",
  tagline: "Full-Stack Software Developer",
  description: "Full-Stack Software Developer building production web applications, backend systems, and autonomous AI agents with NestJS, React, PostgreSQL, and AWS.",
  baseUrl: "https://rishabhsnaik.netlify.app",
  logo: "/images/logo.png",
  logoWidth: 32,
  copyright: "Designed By Rishabh Naik",
  navLinks: [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Gallery", href: "/gallery" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
  ],
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/rishabh._.naik/", icon: "instagram" },
    { name: "Twitter", href: "https://twitter.com/rishabhnaik37", icon: "twitter" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/rishabhnaik/", icon: "linkedin" },
  ],
};

export const homepageData = {
  banner: {
    title: "Welcome",
    content: "Hey, My name is Rishabh.",
    subtext: "Full-Stack Software Developer building production web applications, backend services, and autonomous AI systems at Anantaloop with NestJS, React, PostgreSQL, and AWS.",
    image: "/images/Rishabh.jpeg",
    button: {
      enable: true,
      label: "View Resume",
      link: "https://drive.google.com/file/d/1RRsOacEYqRz0nDekhrGLhBBGmVlIoTuC/view",
    },
  },
  about_product: {
    title: "What can I do for you?",
    subtitle: "Bringing ideas to life through creative digital artistry, modern web development, and thoughtful visual design.",
    items: [
      {
        title: "Digital Illustration",
        category: "Concept Art & Paintings",
        content:
          "I create very interesting paintings that are inspired by concept art and realistic objects. To make the effect ideal, I focus heavily on the brushwork and proportions. The artwork comes to life with the use of the proper instruments, such as a graphic tablet and good software, such as Krita.",
        button: {
          enable: true,
          label: "View Gallery",
          link: "/gallery",
        },
      },
      {
        title: "Web Development",
        category: "Modern Static & Interactive Websites",
        content:
          "I am keen to create static websites showcasing your work. It can comprise of blogs, forums, portfolios, presentations or personal web pages. Due to their customizability of colours and features, these websites interact with your audience.",
        button: {
          enable: true,
          label: "Explore Blogs",
          link: "/blog",
        },
      },
      {
        title: "Graphic Design",
        category: "Identity & Visual Assets",
        content:
          "Design can do wonders if it is done right. I focus on aesthetics and build with compositions with the proper objects. I can create logos, posters, vector objects or assets. The designs can elicit a different set of emotions.",
        button: {
          enable: true,
          label: "Get in Touch",
          link: "/contact",
        },
      },
    ],
  },
  familiarWith: [
    { name: "C", src: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg" },
    { name: "Python", src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
    { name: "GIMP", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/The_GIMP_icon_-_gnome.svg" },
    { name: "Inkscape", src: "https://www.ooraycreation.com/wp-content/uploads/2015/01/inkscape-logo.png" },
    { name: "C++", src: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" },
    { name: "Krita", src: "https://upload.wikimedia.org/wikipedia/commons/7/73/Calligrakrita-base.svg" },
    { name: "HTML5", src: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
    { name: "CSS3", src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
    { name: "Figma", src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  ],
};

export const contactData = {
  title: "Contact",
  description: "Get in touch for full-stack software development, engineering roles, and production systems.",
  office: {
    mobile: "6360908381",
    email: "rishabhnaik37@gmail.com",
    location: "Bangalore, India",
    content: "Feel free to reach out directly through phone, email, or any of the social platforms below.",
  },
  socialLinks: [
    {
      social: "LinkedIn",
      icon: "linkedin",
      para: "Connect with me on LinkedIn!",
      hrf: "https://www.linkedin.com/in/rishabhnaik/",
    },
    {
      social: "GitHub",
      icon: "github",
      para: "Discover repositories & code",
      hrf: "https://github.com/RishabhNaik",
    },
    {
      social: "Instagram",
      icon: "instagram",
      para: "Get to know about me on Instagram",
      hrf: "https://www.instagram.com/rishabh._.naik/",
    },
    {
      social: "Twitter",
      icon: "twitter",
      para: "Twitter account & updates",
      hrf: "https://twitter.com/rishabhnaik37",
    },
  ],
  formEndpoint: "https://forms.un-static.com/forms/2b45146ba992bdbff422d804e18bc3310eb06215",
};

export const galleryItems: SushikshaItem[] = [
  { id: "1", images: "1aohALiqrqgtgb4asdTwNzcNbEOdIlbzf", alt: "Gurudath Bantwalkar" },
  { id: "2", images: "1fchIxk9lwIpIaF8nKWqjs7gaqqUgaUAa", alt: "Sahana Kini" },
  { id: "3", images: "19B8CMQ-pUMR-Y_kOYcr60fYd803bQfEX", alt: "Royal" },
  { id: "4", images: "1yc5LVxDC2tZjD4qpZa8XEyaHRtHU1_mb", alt: "Sukanya Pai" },
  { id: "5", images: "15onh2O2qusns-R-Q1vhCTgKPG3pDUkEB", alt: "Navami" },
  { id: "6", images: "12YCbLtor9ULxL7mA3K0zr6M_FU_phWGk", alt: "Sulochana" },
  { id: "7", images: "1U7ZyfjASCJICu_4H0N7cGo_hRDoWB4GN", alt: "Mukund" },
  { id: "8", images: "1dHinhLs4K4hVAoagJJE344w7CLW0vK3R", alt: "Ameesha" },
  { id: "9", images: "1rCUnUMBV6FS4dSVJdUbBRx7AzzQAjpKM", alt: "Niranjan Kamath" },
  { id: "10", images: "1kDOR45KfR0yKgXwv25zZNc5XSZ1d5Hni", alt: "Suraj" },
  { id: "11", images: "1U87ry3M4rJRllmqcpaAGDqdZ9V51rLpx", alt: "Suraj Pai" },
  { id: "12", images: "1WzKzo3L9cDOrWzdR9msfwgilCeKq8Qz-", alt: "Tulsi" },
  { id: "13", images: "1E804b0kR5vvBd1pzVoJwxhKuMuPXGirH", alt: "Pranita" },
  { id: "14", images: "1ypyoENELkG92S86ob_y6_WocyoY_Lymy", alt: "Artwork Dimension" },
  { id: "15", images: "1ba-Ta6SaAzJCbHXl5b6zOg_kw3cE_9Ho", alt: "Deeksha" },
  { id: "16", images: "1gfeBYzYPz-qZEmjQz-df-tLfbUOo5pIv", alt: "Sahana" },
  { id: "17", images: "1XG8_uDKTDPIVFlmIBgxM361rYU8s2poh", alt: "Ananya" },
  { id: "18", images: "179-mImbDeH2ZaBbGXo3lkmbADIgWKdHN", alt: "Suchetha" },
  { id: "19", images: "16ycIe5hc0n3_rqGTCdUq6EhJpQs5Pe6a", alt: "Vaishnavi" },
  { id: "20", images: "1x_bH7bvYVX1xL1HWPgEJK3THQtBJhowA", alt: "Malsekar Karthik" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "next-gen-art",
    title: "Next Gen Art",
    date: "April 10, 2021",
    isoDate: "2021-04-10",
    image: "https://sushiksha.konkanischolarship.com/media/blog-post-thumbnail/digital_illustration_in_progress_tubik_4x.webp",
    description: "An exploration into the rise of digital art, modern tools like Krita & graphic tablets, and the future of visual creation.",
    summary: "Art is a form to express our feelings and emotions. It can also visualize our thoughts on a canvas. From the beginning of the Stone age till now, we have been using pictures or drawings to tell stories. In the stone age, humans used to draw on the wall with whatever they had in their hand...",
    readTime: "4 min read",
    content: `Art is a form to express our feelings and emotions. It can also visualize our thoughts on a canvas. From the beginning of the Stone age till now, we have been using pictures or drawings to tell stories. In the stone age, humans used to draw on the wall with whatever they had in their hand. They would take fruit and draw with their rich colours or sometimes use charcoal as a pencil. Then as time passed people started making paintbrushes, pencils, tools and papers. It was a leap and many artists emerged. They started creating masterpieces from then. generations have passed, and now, we are in the age of technology. Computers have been helping us automate our daily task. Computers are also taking over the field of art. One of the most interesting fields that are emerging is Digital Art/Paintings.

### Best 5 Techie Gadgets for the Digital Artist

![Digital tablet](https://i1.wp.com/blog.chinavasion.com/wp-content/uploads/2017/05/Blog-01.jpg?fit=600%2C400&ssl=1)

### What is Digital Art?

Digital art is a form of art where the drawings are made on computers using modern-day software like Photoshop, Autodesk sketch, Corel painter, Krita and many other tools. It is much easier and time-efficient than traditional art but it does need skills to be mastered. Overall, this is a great skill to be acquired in this era because of the emergence of movies that need VFX design. Even the gaming industry uses digital art forms which compared to other industries is worth a whopping 77 billion dollars. It is also used by animation industries for making and modelling characters that come to life. This is the future for many different forms of art.

### Where is it used?

- **Concept design**
- **Animation**
- **Graphic Design**
- **Realistic paintings**

Digital art is one of its kind. You might see it a lot in movie posters, comics, animations and many more places. It has its significance. When it is being compared to traditional art. Many people have a notion in their head that is digital art cannot be a form of art because it uses computer tools to make a piece and that it's like skipping all of the hard parts of the drawing. I would say no. It is as difficult as traditional art and needs as much concentration as traditional art does.

Photoshop is a cool thing because it gives more options to customize an image. It takes many edits to make a photo look wonderful. For that, we have to concentrate on minute details and digital artists can do it easily.

### How is digital art made and what are the tools?

To make a digital art you need to have a graphic tablet or a mouse and a clear monitor. Graphics tablets are nothing but an input device where you connect it to a computer. By using a stylus( electronic pen) you can write or draw as you do it on a piece of paper. The two types of graphic tablets are display tablets and non-display tablets. Display tablets give an experience - just like paper because you are drawing on the screen. The display tablets are just like your second monitor which displays exactly what’s on your monitor. Then Comes the non-display tablets which need high coordination of eye and hands. Here you will look in the monitor and draw on the tablets. In the beginning, it might feel pretty weird but as time passes you will get a hang of it. Since I mentioned the mouse, you would think how will the mouse help. The mouse can also be used to make digital art in the method of vector illustrations. With the help of basic shapes and its combinations, you can arrive at a complex figure.

I would like to share my experience of having a Graphic tablet. I was too excited when I bought a device called XP-pen Deco-02. After doing a lot of research, I got to know that this tablet was perfect in terms of features and prize. After Unboxing and reading the user manual, I quickly connected it to the computer and installed some drivers. It was time for me to test it. But it was confusing because I wasn't getting the line strokes that I wanted. The settings needed to be tweaked a lot to get the right amount of pressure in the pen. The eye-hand coordination was not so good and my drawings would turn out to be bad. I did not know which software to use so I tried Krita for the first time and it was marvellous. It's open-source software. (I will write an entire blog on Krita so stay tuned.) As days passed, I learnt how to configure the tablet. Sometimes instead of the mouse, I use the tablet to get more experience on it. I have been practising digital art for over 1½ years now. I have also done numerous paintings and graphic illustrations on them.

**Conclusion:** Art is nothing but expressing your emotions through paintings and illustrations, may it be traditional or digital. The advancement of computers helps us to create our world. It can also help you save a lot of time in colouring. Flexibility is the key and tools can do wonders.`
  },
  {
    slug: "display-your-work",
    title: "Display your work",
    date: "May 7, 2021",
    isoDate: "2021-05-07",
    image: "/images/Rishabh.jpeg",
    description: "Reflections on daily habits, building a portfolio from scratch, and learning from Austin Kleon's 'Show Your Work'.",
    summary: "This is my first blog that is highly written on my experiences. The series of upcoming blogs contain all the things that I did on that particular week and the things that I learnt. A focused group of ours from Sushiksha sit for a call every night at 9:30 pm...",
    readTime: "5 min read",
    content: `This is my first blog that is highly written on my experiences. The series of upcoming blogs contain all the things that I did on that particular week and the things that I learnt. A focused group of ours from **[Sushiksha](https://sushiksha.konkanischolarship.com/)** sit for a call every night at 9:30 pm at IST to talk about the day. Every month we had to set five goals as Pentathlon(Ultraworking), which consists of goals like fitness, Wake-up / Sleep cycle, Most important work (MIW), Nutrition and Planning. This month we customized the framework. This time only MIW was kept as it is with a minimum of 1 hour of MIW per day. Habits were introduced. Also, it was all about outcome-based. My goal was to create a portfolio website to show my work more professionally.

On the first day, I decided to create my website from scratch with all the CSS and HTML. It was an overwhelming situation but then had to choose a template and complete the work as soon as possible. The main objective was to create a website of my artworks so that people could see it even though if they are not following it just like a catalogue. As you all might know I have an Instagram handle where I post my Digital artworks with my friend making the music. So I and my friend Suryakanth are both creating works for this page Cosmix. I also thought of making a website separately for cosmix so that it could be a market place for people who love artworks and music. I started to make a resume related website that had information about me, my work and also the blogs. I created a static webpage on my resume and blogs the website also had a contact feature but then the blog feature did not work well.

One of our goals for this week which I did not mention above was to read a book. A book named **"[Show your work](https://www.amazon.in/Show-Your-Work-Austin-Kleon/dp/076117897X)"** by **[Austin Kleon](https://austinkleon.com/)** gave me the energy and enthusiasm to work harder, also to enjoy the process of working. The book was mostly about arts and how we could show our work and process as in the book it stated that the work does not speak for itself. People think that without giving any context people can understand what your doing. No, it's wrong we need to explain ourselves or tell it in form of a story so that it connects with the audience. By the end of the book, I was excited to write a blog. The book also mentioned buying a domain making it your place. A website is a good place to **[Show your work](https://www.amazon.in/Show-Your-Work-Austin-Kleon/dp/076117897X)** because it has the flexibility that no other social media platforms can give. Nowadays these social media are controlled by the algorithms that run backend making it effective but it forces you to see the content which it wants to show to you. where a website can only be controlled by you. My mentor **[Royal](https://rosequ.github.io/)** also suggested me to make my own website not depending on medium or other blog sites.

Finally, after revising a ton of bootstrap templates I ended up using static site generator called **[HUGO](https://gohugo.io/)**. I got a recommendation from Srinidhi Bhat one of the members of our focused group. I wanted a way to have a static site and also having many web pages at the same time. Where I struggled for 5 days for the same. The website you are reading is the same website I am talking about. Maybe after few years, the layout might change. If you want to keep an eye, you can follow me on my **[Github repository](https://github.com/RishabhNaik/RishabhNaik.github.io)** . I am also thankful to myself for not diving into the templates page end up wasting a lot of time.

All the things I am writing are influenced and inspired by the book **[Show your work](https://www.amazon.in/Show-Your-Work-Austin-Kleon/dp/076117897X)**. I highly recommend the book. I might be having projects from my past work or a college project but that's not enough. So I have decided to work on my artworks daily and show minor progress each week.`
  },
  {
    slug: "its-a-hardship",
    title: "Its a hardship",
    date: "May 17, 2021",
    isoDate: "2021-05-17",
    image: "https://drive.google.com/uc?export=view&id=1h-rdc-yeybUk8l1-Fi8tgqmyZOqYVSU3",
    description: "The creative journey of creating a mechanical illustration of the Harley Davidson LiveWire bike using Krita.",
    summary: "The tougher the work the more we will enjoy, I have made digital Art for 2 years still it was hard for me. But after this Art, it was not. As you may all know now, I originally made digital illustrations and posted them on Instagram...",
    readTime: "4 min read",
    content: `The tougher the work the more we will enjoy, I have made digital Art for 2 years still it was hard for me. But after this Art, it was not. As you may all know now, I originally made digital illustrations and posted them on Instagram. In a long time, I hadn't done mechanical illustrations. This time I was thinking of making a Superbike, but I did not know which one to do. I posted a survey on Instagram to find out what people loved. The poll included four major bikes by BMW, Ducati, Harley Davidson and Kawasaki. You might think "There were other bikes which were good!" Yes, I know but this was a random pick. There was a good response to that poll. The result was Harley Davidson live wire.

I was confused after collecting the references as to whether to calculate it (trace the outlines) or to do it freely. After an hour, after scribbling and sketching, I finished with a line of the drawing. I started doing it freehand and let my paint flow through the canvas. I was glad how it came out. I drew another line of work over the existing one to make it more detailed and to prevent confusions while painting. The sketch was complete and clean.

The real process starts from here. I started with freehand painting just going over the sketch without having a perfect form. I did the whole bike body and deleted the layer later because it wasn't good. I did this mistake two times. As usual, I felt demotivated and went to youtube to search for inspiration. That is I searched how to colour a concept bike. In one of the video, he showed how to paint using a lasso/selection tool. I was too sceptical because it's hard to get a smooth line using a lasso. Then I searched for how to use selections tools that is lasso, magnetic, square, circle and bezier selection tool effectively in Krita.

### How I paint using selection tool?

I select an area for eg: If I am making a car I will select the window of the car and colour it so that the colour does not go out. I made a new layer for each part of the bike and coloured it. All these parts were in different layers so it was easy to come back and correct them later. The whole issue was with selecting the parts of the bike. In a selection, you can add a part by holding a shift and drawing the part you want to select. Similarly, you can hold the alt key to remove a part from the selection. It is good practice if in case you mess up.

After I coloured the pieces, about 20 such layers existed. I was not used to naming the layers the poor custom. Then I struggled to find the correct layer and correct it. The tiers of the bike were the most difficult for me to draw. It took me almost a day to figure out the scale of the tiers because even though I had a drawing, I didn't think the proportions were correct. I was so down by the halfway point of the sketch that I couldn't do something for an hour. I went back to YouTube and discovered an incredible man. Challa is the name of his channel. Within an hour or so, he was completing his Fiverr orders. I continued the work, After finishing a decent amount of progress I moved out of my chair.

### Final touch

After completing the painting, I merged the layers and put another layer above it. I turned the layer style into multiply. The multiply layer darkens the colour below it so it's easy to just take a big brush and run over the shadow areas. Adding the background was fun, just a few blue and white lines crossing each other. The ground was a mixture of dotted brush and a soft brush making it look like sand.

And voila there it is my finished piece.

It took me 4 days to complete this art, I had a troublesome time imagining the perspective and lighting although I was using a reference It was exhausting. I had given up halfway. This was my hardest painting so far because it had many details to cover. I am happy with how it turned out it was worth it. I thank myself for not giving up.

### Useful Links:
- [Krita](https://krita.org/en/)
- [Challa Youtube channel](https://www.youtube.com/user/challagundla4)
- [Similar workflow](https://www.youtube.com/watch?v=MJ8cqsAZX-A&t=4s)`
  }
];

export const legalData = {
  privacyPolicy: {
    title: "Privacy Policy",
    lastUpdated: "April 2021",
    sections: [
      {
        heading: "Overview",
        body: "Please read these terms and conditions stated below, which outline a lot of legal goodies, but the bottom line is it’s our aim to always take care of both of us, as a visitor, customer, or as a creator. We’ve included these terms to be transparent, fair, and secure."
      },
      {
        heading: "Data & Privacy",
        body: "We respect your privacy and only collect information when voluntarily provided via our contact form (such as your name and email address) to respond to your queries. We never sell or distribute your personal data to third parties."
      },
      {
        heading: "External Links",
        body: "Our website contains links to external websites (e.g. GitHub, LinkedIn, Instagram, Google Drive, Krita). Please note that we do not have control over the privacy practices or content of these external sites."
      },
      {
        heading: "Contact",
        body: "If you have any questions regarding privacy or terms, feel free to contact at rishabhnaik37@gmail.com."
      }
    ]
  },
  termsConditions: {
    title: "Terms & Conditions",
    lastUpdated: "April 2021",
    sections: [
      {
        heading: "General Terms",
        body: "Please read these terms and conditions stated below. If you have an issue or inquiry, always feel free to email us at rishabhnaik37@gmail.com and we’ll do our best to resolve it in a fair and timely way."
      },
      {
        heading: "Product & Digital Art Inquiries",
        body: "All creative works, illustrations, design assets, and articles displayed on this website are created by Rishabh Naik unless otherwise attributed. Commercial use or reproduction requires prior written permission."
      },
      {
        heading: "Support & Collaborations",
        body: "Support covers web projects, commissioned artwork, or collaborative discussions initiated through the official contact form or verified social handles."
      }
    ]
  }
};
