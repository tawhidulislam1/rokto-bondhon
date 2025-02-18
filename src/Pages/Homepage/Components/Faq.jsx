
const Faq = () => {
    return (
        <div className="my-12">
            <h2 className="text-5xl font-bold text-black text-center mb-10 dark:text-white">FAQ & Rules</h2>

            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium dark:text-white">What is Study Together? What is it for and what can I do here?</div>
                <div className="collapse-content">
                    <p>Study Together is a study community and a virtual study space that you can access 24/7 from anywhere. When part of our community you will be able to study live with other students from all around the globe 🌏 – Asia, Europe, Oceania, Africa and America.
                        Can you imagine going to the library without actually having to go? On Study Together you can grab a snack or chat with a friend during your study break without being told off by the librarian.
                        Enter one of the study rooms to study, and let your neurons mirror other people’s behavior - seeing others studying will boost your own productivity.
                        As you study on Study Together your progress will be tracked and gamified, and you will also be rewarded for keeping it up🏆.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium dark:text-white">Do I need to study a specific subject or go to a specific school?</div>
                <div className="collapse-content">
                    <p>No, you decide what and how long you want to study - as long as we are together 🙂 It also doesn’t matter whether you are in high school, college or university. You can choose to study in general rooms, in pre-university or university rooms, and on subject-specific channels. Since all our study rooms are open 24/7, it is totally up to you when and how often you would like to join.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium dark:text-white">I would like to join. How do I do that?</div>
                <div className="collapse-content">
                    <p>Perfect, you are welcome in the community! Great that you are giving it a shot. We currently offer study rooms accessed directly from our website using Zoom and also a Discord Server with different study channels. You can join them here: zoom or Discord (it is up to you if you want to try both or just one of the options). Should you have any questions after joining, feel free to drop us an email at help@studybuzz.com or write one of the moderators in the chat 💬.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium dark:text-white">Are there any regular events or rooms for group discussions, etc?</div>
                <div className="collapse-content">
                    <p>Yes! By being part of the community you will have access to a variety of events, from 🧘mindfulness sessions to 📚 study tips bootcamps. You can find the events list on our website , and on the info board shown on the study calls. You can also follow our social media, join our Telegram group or subscribe to our newsletter. All events are for free 🥳</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium dark:text-white">Who is behind Study Together and what are you trying to accomplish?</div>
                <div className="collapse-content">
                    <p>In 2020 we started creating our social learning movement, built on a virtual study space where learners are empowered to reach their full potential together. Since then we are growing exponentially, and we now have over 250.000 users in a very active community from over 160 countries. From our HQ located in Berlin- Germany, our multicultural team works hard to create a world where everyone enjoys learning. Find out more about us.</p>
                </div>
            </div>
        </div>
    );
};

export default Faq;