import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const About = ({ onBack }) => {
  return (
    <div className=" min-w-[300px] max-w-[850px] w-full h-full flex flex-col p-[20px_20px_20px_20px] overflow-auto bg-[#252933] rounded-[5px] text-xl max-[780px]:w-full max-[780px]:h-full">
      <div className="flex items-center mb-7">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="cursor-pointer"
          onClick={onBack}
        />
        <div className="ms-5">About</div>
      </div>
      <div className="text-3xl font-bold">
        Welcome to <span className="animate-color-change">TRUST REALIFY</span>
      </div>{" "}
      <p className="mt-10 text-xl">
        At ChatConnect, we believe in bridging distances and fostering
        connections. Our platform is designed to provide seamless communication,
        allowing users to interact, share, and collaborate effortlessly. Whether
        you're chatting with friends, engaging in group discussions, or
        networking with professionals, we’ve got you covered.
      </p>
      <h2 className=" mt-5">Key Features:</h2>
      <ul>
        <li>
          <strong>Real-Time Messaging:</strong> Experience instant communication
          with our fast and reliable messaging service.
        </li>
        <li>
          <strong>User-Friendly Interface:</strong> Our intuitive design ensures
          that you can navigate with ease.
        </li>
        <li>
          <strong>Secure Conversations:</strong> Your privacy is our priority.
          We implement top-notch security measures to protect your data.
        </li>
        <li>
          <strong>Customizable Profiles:</strong> Personalize your chat
          experience with customizable themes and avatars.
        </li>
        <li>
          <strong>Group Chats:</strong> Connect with multiple friends or
          colleagues in one space, making collaboration easier than ever.
        </li>
      </ul>
      <h2 className="mt-10">Join Our Community!</h2>
      <p>
        Become a part of the ChatConnect family today and start making
        meaningful connections. We are committed to continuous improvement and
        welcome your feedback to enhance your experience.
      </p>
      <div className="self-center mt-5 text-2xl grow flex ">
        &copy; 2025 &nbsp;<b> TrustRealify</b>. All rights reserved.
      </div>
    </div>
  );
};
