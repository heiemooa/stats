import React from "react";
import { GithubOne, Home, Mail, Star } from "@icon-park/react";
import CustomLink from "@/components/customLink";
import Package from "../../package.json";

const Footer = () => {
  // 加载配置
  const githubName = import.meta.env.VITE_GITHUB_NAME;
  const homeUrl = import.meta.env.VITE_HOME_URL;
  const emailUrl = import.meta.env.VITE_EMAIL_URL;
  const siteIcp = import.meta.env.VITE_SITE_ICP;
  const blogUrl = import.meta.env.VITE_BLOG_URL;

  return (
    <footer className="text-center text-gray-500 my-12">
      <div className="flex justify-center space-x-4">
        <CustomLink icon={<Home />} to={homeUrl} />
        <CustomLink icon={<Star />} to={blogUrl} />
        <CustomLink
          icon={<GithubOne />}
          to={`https://github.com/${githubName}/`}
        />
        <CustomLink icon={<Mail />} to={`mailto:${emailUrl}`} />
      </div>
      <div className="leading-6	mt-2 text-sm">
        <p className="flex justify-center">
          <CustomLink
            text={Package.name}
            to="https://github.com/heiemooa/stats"
          />
          &nbsp;Version&nbsp;{Package.version}
        </p>
        <p className="flex justify-center">
          基于&nbsp;
          <CustomLink to="https://uptimerobot.com/" text="UptimeRobot" />
          &nbsp;接口&nbsp;|&nbsp;检测频率 5 分钟
        </p>
        <p className="flex justify-center space-x-2">
          <span>Copyright &copy; 2023 - {new Date().getFullYear()}</span>
          <CustomLink to="https://emooa.com" text="Emooa" />
          {siteIcp ? (
            <React.Fragment>
              &nbsp;|&nbsp;
              <CustomLink to="https://beian.miit.gov.cn/" text={siteIcp} />
            </React.Fragment>
          ) : null}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
