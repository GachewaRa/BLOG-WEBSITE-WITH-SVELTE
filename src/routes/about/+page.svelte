<script>
    // You can uncomment this when you have the profile image
    // import profileImage from '$lib/images/profile.jpeg';
    
    // State to toggle between short and full version
    let showFullVersion = false;
    
    // Function to toggle between versions
    function toggleVersion() {
        showFullVersion = !showFullVersion;
    }
</script>

<svelte:head>
    <title>About Me</title>
</svelte:head>

<section class="container mx-auto py-8 px-4 prose prose-stone dark:prose-invert max-w-3xl">
    <h1 class="text-3xl font-bold mb-6 text-center">About Me</h1>

    <div class="mb-6 text-center">
        <!-- <img src={profileImage} alt="Profile" class="rounded-full w-48 h-48 mx-auto mb-4" /> -->
        <p><strong>Name:</strong> Ra</p>
        <p><strong>Age:</strong> Mid twenties</p>
        <p><strong>Location:</strong> Nairobi</p>
    </div>
    
    <div class="flex justify-center mb-6">
        <button 
            on:click={toggleVersion} 
            class="px-4 py-2 bg-stone-800 text-white rounded-md hover:bg-stone-700 transition-colors"
        >
            {showFullVersion ? 'Show Summary' : 'Read Full Version'}
        </button>
    </div>

    {#if !showFullVersion}
        <!-- Short Version -->
        <div class="space-y-6">
            <p>
                I'm a developer and writer passionate about life-long learning and evolution. With formal training in architecture and a self-taught background in technology, I consider myself a polymath who moves between disciplines to make meaningful contributions to the world.
            </p>
            
            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "Spirituality is the discipline of understanding yourself." — HealthyGamer
            </blockquote>
            
            <p>
                My journey accelerated after high school when I embraced boundless learning. Though I initially wanted to pursue computer science, I found myself in architecture school, which proved fascinating. Later, I transitioned to web development, guided by my passion for technology and problem-solving.
            </p>
            
            <p>
                This digital journal serves as a space to document my learning journey, express myself, and share knowledge with others. I believe in the power of writing both as a tool for refining understanding and as a means of exploration.
            </p>
            
            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "Until you do what you believe in, you don't know whether you believe it or not." — Leo Tolstoy
            </blockquote>
            
            <p>
                I'm driven by an entrepreneurial spirit and a problem-solving mindset. For me, entrepreneurship, programming, and problem-solving form a virtuous cycle that guides my approach to technology and life.
            </p>
        </div>
    {:else}
        <!-- Full Version -->
        <div class="space-y-6">
            <h2 class="text-2xl font-semibold">The Journey</h2>
            <p>
                I'm many things – that's how I like to think of myself. But to establish contact with the ground, I'm a developer and a writer committed to life-long learning, genuinely, for the sake of evolution. I think that the passage of time should bring us to higher levels of understanding and better ways of looking at things and doing things. So I want to utilize time in the best way possible – to evolve. Isn't that the spiritual purpose of life anyway; evolving from lower to higher states?
            </p>

            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "Spirituality is the discipline of understanding yourself." — HealthyGamer
            </blockquote>

            <p>
                Time is the most scarce resource we have. In the words of George Gilder, "Time is the final measure of cost. Time is what remains scarce when all else becomes abundant." Though this was said in the context of economics and technology, I believe that the principle is a general one. In light of this, I think choosing to use time wisely is one of the wisest decisions anyone can make.
            </p>

            <p>
                For me, the decision was that for every time spent, I'd have something to show for it. I'm not the strict time budgeter, but I think I do have a subconscious drive to be involved in useful stuff, or make the stuff I'm involved in useful if I can't choose what I'm involved in. I'll read, watch, play, learn, walk, contemplate, write, design, build, explore and do other things, which from my standpoint, are supposed to add cumulatively in a compound manner. With time, these experiences, I believe, should make me better at any particular thing that I'll set out to do at whatever point in the coming days. They should make me better at doing life in general, if I can put it that way.
            </p>

            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "Beware of looking for goals: look for a way of life. Decide how you want to live and then see what you can do to make a living within that way of life." — Hunter S. Thompson
            </blockquote>

            <h2 class="text-2xl font-semibold">The Journey Begins</h2>
            <p>
                And this is where a tool like this digital journal comes in. At some point along the way, I realized that I needed some place to document what I was learning, to express myself, and to share that with the world. The learning I'm talking about started, or to be fair accelerated, when I finished high school. For some reason, I perceived that to be some form of jail-break, like how a caged bird would break free and head for the skies.
            </p>

            <p>
                When I was in school I was still curious, just that I saw school as sometimes interfering with my curiosity and learning. And when I was finally done, I jumped at the new opportunity to learn boundlessly. It's been almost a decade, and I've explored many avenues.
            </p>

            <p>
                I'm grateful to all the authors and actors I've learned from (we are all actors, right?). In high school, they ingrained in us that 'To those whom much has been given, much will be required'. There's much that has been given to me in different ways, and for that my gratitude is immense. In turn, I want to give back too. It's genuinely one of the reasons for setting up this digital journal. Having learned so much from others, I'd like for others too to learn from me. As I document what I'm learning, it reinforces my understanding of the concept while also helping others who might be on the same path. Because 'we are all escorting each other home'.
            </p>

            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "When we devote all of our actions to a spiritual goal, everything that we do becomes a prayer." — Muhammad Ali
            </blockquote>

            <h2 class="text-2xl font-semibold">Finding My Path</h2>
            <p>
                From my sojourns through different fields, I've learned much about myself as I've learned about the world. One of those things that I've learned about myself is that I should actively embrace my diverse interests and explore them as my intuition guides me to. For me, my intuition is one of the most handy tools at my disposal, and so far I'm thankful for the places it has taken me to, the discoveries I've made, and who I've become thus.
            </p>

            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "I always tell actors when they go in for an audition: Don't be afraid to do what your instincts tell you. You may not get the part, but people will take notice." — Robert De Niro
            </blockquote>

            <p>
                By the time I completed high school, I wanted to pursue computer science as a career, but the winds that were blowing around that time of the year saw my boat docking in architecture school. I could have been grumpy, but with a little attention I realized that the field was quite fascinating. So I learned on. My formal professional background is in architecture.
            </p>

            <p>
                But my passion for computer science and technology lingered. I kept the fire burning by reading books about technology to captivate my passion and kindle my imagination. I read The Second Machine Age, Artificial Intelligence and the End of Human Era, Life After Google, The Master Switch, among others. They were fascinating.
            </p>

            <p>
                After graduating from fourth year, I took the detour and got into a web development boot-camp to kickstart my career in tech. Inasmuch as I'm a developer in terms of professional practice, I like to not minimize my life to that. As mentioned earlier, I have multiple interests, and so I prefer to think of myself as a polymath who is at one point occupied by some particular project or discipline, but who generally moves between disciplines in an effort to synthesize the experience and make more profound contributions to the world.
            </p>

            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "We do not strive to be firemen, we do not strive to be bankers, nor policemen, nor doctors. WE STRIVE TO BE OURSELVES. But don't misunderstand me. I don't mean that we can't BE firemen, bankers, or doctors...but that we must make the goal conform to the individual, rather than make the individual conform to the goal." — Hunter S. Thompson
            </blockquote>

            <h2 class="text-2xl font-semibold">The Entrepreneurial Spirit</h2>
            <p>
                You see, back in high school, my passion for software and technology grew from an interest in entrepreneurship. I didn't just jump into computers just for the sake of it – which is also not bad. Rather, I figured that if I was knowledgeable about software and technology, I would be in a much better position to take advantage of opportunities as they came and as I saw them; and I was very much convinced that there are numerous opportunities all over, especially in Africa. I still have that conviction.
            </p>

            <p>
                I could use tech to make my life better and smoother, as well as the lives of many others. That's why I'm here. And entrepreneurship; where did that come from? I think it just grew in me when I started seriously thinking about what I wanted to do with my life. For me, it was as simple as looking at the things around me, not being happy with that, taking note of that reaction, and deciding that maybe I could make it better. That's the primary inspiration.
            </p>

            <p>
                And how best to go about changing the world you live in? I say entrepreneurship is the best avenue for that. In a comical way, let's say I realized I have so many complaints to make, and the best way to complain about something is to dive in and create your own version of the thing. As Andre Torrez put it, 'Complain about the way other people make software by making software.' So I'll use software to create the thing that I will use to bring about a change I want to see in the world. Not that all things need software or software is the only way; but I thought software would be a big part of it. That's how passion for entrepreneurship begot passion for software.
            </p>

            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "Until you do what you believe in, you don't know whether you believe it or not." — Leo Tolstoy
            </blockquote>

            <h2 class="text-2xl font-semibold">The Problem-Solver's Mind</h2>
            <p>
                Again, entrepreneurship and software share one thing, and that one thing is a quality that really lights me up – problem solving. There are those of us members of the human species who have a penchant for solving problems; when we see an issue, our minds just start wondering how it can be solved, or how something can be better. Not because of a chronic psychological predisposition though, but from a healthy healing point of origin.
            </p>

            <p>
                And when you are into problem solving, entrepreneurship will be always there whispering in your ear, because that's the gladiator's arena to solve problems. And what's a better way of jogging your problem-solving skills than writing code, running it, seeing it fail, fixing it, then running it until it executes successfully?
            </p>

            

            <p>
                As the fiction character Elliot Alderson said, 'A bug is never just a mistake. It represents something bigger. An error of thinking that makes you who you are.' Programming has taught me much about life in general, and about solving problems in particular. For me, these three things – problem solving, entrepreneurship, and programming - go hand in hand, forming a virtuous cycle. That's how I map myself in the field of tech.
            </p>

            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "I do what interests me.. and I do it as well as I know how and try to get better. That's all." — John Hurt
            </blockquote>

            <h2 class="text-2xl font-semibold">The Power of Expression</h2>
            <p>
                I also realized that I do have a strong urge for self-expression. I think most people do, if not everyone. And again, I figured that entrepreneurship would be a good instrument for that too. There are numerous ways for one to express themselves – including art, play, and what I'm doing here, writing. Even programming. Entrepreneurship is an addition to the list, and for me, a very significant addition. I'm for the life of the party, if you know the party I'm referring to.
            </p>

            <h2 class="text-2xl font-semibold">Writing: A Tool for Thought</h2>
            <p>
                And writing? I think writing is a precious indispensable tool for two important things: exploration and refinement. The function of writing to refine one's understanding of something is quite well known. In the words of Neil Levy: "Notes on paper, or on a computer screen [ ... ] do not make contemporary physics or other kinds of intellectual endeavor easier, they make it possible … no matter how internal processes are implemented [ … you … ] need to understand the extent to which the mind is reliant upon external scaffolding."
            </p>

            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "One cannot think without writing." — Niklas Luhmann
            </blockquote>

            <p>
                Luhmann kind of exaggerated a bit there. People are thinking all the time without the help of writing paper or pads. But what you realize is that thinking without writing, especially for non-trivial matters, tends to clog one's mind, and if the matter is sensitive and personal, can raise tension and anxiety in one's being.
            </p>

            <p>
                Writing then, for non-trivial matters at least, scaffolds one's thinking, preventing the mind from clogging and enabling progress in the thought process. For sensitive and personal matters, writing sheds light on the darkness and dispels the anxiety, allowing one to better process the experience.
            </p>

            <p>
                As a programmer and as a learner in general, writing is an indispensable tool. I learn better when I write about what I'm learning. This concept is so significant that someone literally wrote a book titled 'Writing to Learn'. When I learn about blockchain then have to write about it, it solidifies how I understand that topic. It exposes any gaps in knowledge or understanding that I may have about that topic, forcing me to get things straight. If I get things straight, guess what I can do with that?
            </p>

            
            <h2 class="text-2xl font-semibold">Understanding Leads to Opportunity</h2>
            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "If you don’t make efforts to acquire knowledge, then you wouldn’t expect to have it, and if you don’t put the knowledge you have to use, you cannot expect to gain from it." — Tehuti
            </blockquote>

            <p>
                A lot. I tend to think that in most scenarios, most people don't fully understand the stuff they are working with. They work with it alright, but with some gaps here and there. It mostly works fine, until zero-day. In computing, zero-day refers to a vulnerability that has just been discovered, and so is not yet fixed and is possibly exploited by hackers.
            </p>

            <p>
                If you can understand the things you are working with a bit better, you minimize such risks. I once sat down to write about a concept in programming, then I realized my understanding of try-catch blocks had a gaping hole, and I had to fix that hole to proceed with my writing. So I see writing as an important part of 'minimizing zero-day bugs', in life as in computing.
            </p>

            <p>
                If you understand your stuff better than the average Joe, you can do so much more. To illustrate this, consider how many people have heard of the concept of blockchain. If you stopped someone in town and asked them if they've heard about it, they would most likely say they have. Sure enough, almost everyone has heard of cryptocurrencies, which are based on blockchain. But if you asked them to explain blockchain to you like a kid, many would fumble.
            </p>

            <p>
                Myself, I understand it a good measure – the hashing, proof-of-work concept, and a few other things about it. But I still feel that it's not completely within my grasp. Once I get down to writing about it, these dark corners will become apparent, and I will have to refine them. Anyone who has coded knows how hard it is to shake a bug off one's mind once it has revealed itself. Same goes here. Once you discover a gap in your knowledge, your mind automatically adds it to your to-do list to fill it. Unless you want a zero-day attacker to catch you off-guard.
            </p>

            <p>
                Now, back to my blockchain story – if by writing about it, I came to understand the concept so well, don't you think that now I would be in possession of some kind of power; the power to utilize blockchain technology for some end? It's one way of finding opportunities if you ask me. Or loopholes, if you are an ethical 'bad guy'. I'll write, I'll understand, then the opportunities will reveal themselves to me. That's how I see it. That's writing to refine understanding and thinking.
            </p>

            <h2 class="text-2xl font-semibold">Writing as Exploration</h2>
            <p>
                There's also writing to explore. As I write about a topic like blockchain, I am at the same time exploring multiple pathways that can emerge from that topic. When I start to write, it's like I get into this town of ideas in my mental space, and at the start, every idea is inside its house, locked in, and as I roll my ballpoint along, there seems to be a sort of opening of windows and doors in this mental town, and every other concept or idea in my head is trying to invite me or call to me to tag it along.
            </p>

            <p>
                And I realize there's so much that could come of this sojourn. There's so much already that is waiting in a latent state, awaiting a passing star to pass nearby and reawaken it and perhaps tag it along. I can't recount the number of times I started to write on my WhatsApp status something just for the sake of dropping a comment, or just captioning an image, and it spilled over into a full-blown treatise about the subject. Seriously. I even started compiling those rants and was amazed to see some of them totaling more than 3,000 words!
            </p>

            <p>
                That's when I realized that oh, I usually have something to say about stuff, it's just that I don't seem to get enough triggers or catalysts. That to me demonstrates the power of writing. From that 'aimless' wandering of the mind and the fingers, I've gotten so many ideas, and developed novel ways of looking at things; something I wouldn't trade anything for.
            </p>

            <p>
                Writing is indeed indispensable for me. And that's why a platform like this is a must-have that is long overdue. Somewhere to collect my thoughts in writing and share with you what I'm learning, and not to forget, a place to practice with what I've already put into my head from years of reading, study and contemplation.
            </p>

            <p>
                All that stuff is in my head somewhere, waiting to be utilized. With a blog, I guess I have the catalyst to get the words flowing anytime. It will put me on a schedule to get something out regularly. I want that so much.
            </p>

            <p>
                When I write, I bury what is stuffing my mind, putting it to rest and creating room, more mental space for wild wondering and processing new stuff that is capturing my attention. But what I bury in writing are not corpses. They are seeds. In a garden. They will sprout and grow, and I will enjoy the fruits of those, as I continue to plant even more, on and on in that manner. In the end a vast tropical forest full of life and diversity. That's maybe the best way I can describe how I view writing.
            </p>

            <p>
                From this perspective, writing is essential, in every field, from literature, to biology, to history and programming. It serves to expound, to explore, as well as to unite one's experience. As such, expect anything escaping my mind in written form to find its way here.
            </p>

            <blockquote class="border-l-4 border-stone-500 pl-4 italic">
                "You can never understand everything. But you should push yourself to understand the system." — Ryan Dahl, creator of NodeJS
            </blockquote>

            <blockquote class="border-l-4 border-red-500 pl-4 italic">
                "I never saw a wild thing sorry for itself." — D. H. Lawrence
            </blockquote>
        </div>
    {/if}
</section>

<style>
    /* Add custom styles here if needed */
    blockquote {
        margin: 1.5rem 0;
        background-color: rgba(120, 113, 108, 0.1);
        padding: 1rem;
        border-radius: 0.25rem;
    }
    
    /* Smooth transition for toggling content */
    div {
        transition: all 0.3s ease-in-out;
    }
</style>