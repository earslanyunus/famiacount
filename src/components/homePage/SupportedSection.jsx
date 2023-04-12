import PlatformsIcon from "./PlatformsIcon";
import netflix from "../../assets/netflixIcon.svg";
import youtube from "../../assets/youtubeIcon.svg";
import google from "../../assets/googleIcon.svg";
import spotify from "../../assets/spotifyIcon.svg";




export default function SupportedSection() {
  return (
    <div className="py-16 container flex flex-col items-center justify-center">
      <p className="text-text-sm text-primary-700 font-semibold mb-4 text-center">
        Supported Platforms
      </p>
      <p className="text-text-lg font-normal text-gray-600 text-center">
        We are constantly trying to increase the number of platforms we support.
        We add platforms that allow family or group subscriptions to our list,
        as we don't want your account to be closed :)
      </p>
      <div className="flex w-full justify-between mt-12 items-center">
        <PlatformsIcon image={netflix} />
        <PlatformsIcon image={youtube} />
        <PlatformsIcon image={google} />
        <PlatformsIcon image={spotify} />
      </div>
      <button type="button" className="btn-primary-lg mt-12">All Platforms</button>
   
    </div>
  );
}
