import HobbyCard from '@/front/components/about/HobbyCard.tsx'
import ProjectCard from '@/front/components/about/ProjectCard.tsx'
import SkillsCard from '@/front/components/about/SkillsCard.tsx'
import { Tabs, Tab } from '@heroui/react'
import { BsFilm } from 'react-icons/bs'
import { FaMusic, FaRegHeart } from 'react-icons/fa'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { IoCode } from 'react-icons/io5'
import { LuBriefcase } from 'react-icons/lu'
import { MdOutlineSchool, MdOutlineTravelExplore } from 'react-icons/md'
import { GrContact } from 'react-icons/gr'
import ContactMeCard from '@/front/components/about/ContactMeCard.tsx'
import SkillsCarouselCard from '@/front/components/about/SkillsCarouselCard.tsx'

export default function About() {
  return (
    <section className="min-h-screen flex flex-col items-center space-y-5 w-full mx-auto py-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
        About Me
      </h1>

      <Tabs aria-label="Options" color="primary">
        {/* 技能 */}
        <Tab
          key="skills"
          title={
            <div className="flex items-center space-x-1 sm:space-x-2">
              <IoCode className="h-5 w-5" />
              <span>技能</span>
            </div>
          }
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <SkillsCard
              title="前端开发"
              skills={[
                { skill: 'HTML', level: 90 },
                { skill: 'CSS', level: 80 },
                { skill: 'JavaScript', level: 70 },
                { skill: 'vue3', level: 60 },
                { skill: 'react', level: 50 },
              ]}
            />
            <SkillsCard
              title="后端开发"
              skills={[
                { skill: 'HTML', level: 90 },
                { skill: 'CSS', level: 80 },
                { skill: 'JavaScript', level: 70 },
                { skill: 'Python', level: 60 },
                { skill: 'Java', level: 50 },
              ]}
            />
            <div className="col-span-1 md:col-span-2">
              <SkillsCarouselCard />
            </div>
          </div>
        </Tab>

        {/* 项目 */}
        <Tab
          key="project"
          title={
            <div className="flex items-center space-x-1 sm:space-x-2">
              <LuBriefcase className="h-5 w-5" />
              <span>项目</span>
            </div>
          }
          className="w-full flex flex-col gap-4 sm:gap-8"
        >
          <ProjectCard
            projectName="苍穹外卖"
            projectLink="#"
            projectChip={['vue3', 'react', 'typescript']}
            projectDescription="苍穹外卖项目是一个全栈式的外卖服务系统，涵盖前端与后端的开发。前端部分提供了简洁易用的用户界面，方便用户浏览菜品、下单支付；后端则负责订单管理、菜品管理、用户管理等核心业务逻辑，确保系统的稳定运行和数据的安全。该项目于2024年开发完成，运用了先进的技术架构，具备良好的可扩展性和性能表现。"
          />
          <ProjectCard
            projectName="FROM-FLOW问卷调查系统"
            projectLink="#"
            projectChip={['react', 'tailwindcss', 'typescript']}
            projectDescription="苍穹外卖项目是一个全栈式的外卖服务系统，涵盖前端与后端的开发。前端部分提供了简洁易用的用户界面，方便用户浏览菜品、下单支付；后端则负责订单管理、菜品管理、用户管理等核心业务逻辑，确保系统的稳定运行和数据的安全。该项目于2024年开发完成，运用了先进的技术架构，具备良好的可扩展性和性能表现。"
          />
        </Tab>

        {/* 爱好 */}
        <Tab
          key="hobbies"
          title={
            <div className="flex items-center space-x-1 sm:space-x-2">
              <FaRegHeart className="h-5 w-5" />
              <span>爱好</span>
            </div>
          }
          className="w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <HobbyCard
              bgStyle="from-purple-400 to-pink-500 dark:from-purple-800 dark:to-pink-900"
              icon={<IoCode className="h-16 w-16 text-white" />}
              title="编程"
            />
            <HobbyCard
              bgStyle="from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-900"
              icon={<HiOutlineBookOpen className="h-16 w-16 text-white" />}
              title="读书"
            />
            <HobbyCard
              bgStyle="from-red-400 to-orange-500 dark:from-red-800 dark:to-orange-900"
              icon={<MdOutlineSchool className="h-16 w-16 text-white" />}
              title="学习"
            />
            <HobbyCard
              bgStyle="from-yellow-400 to-orange-500 dark:from-yellow-800 dark:to-orange-900"
              icon={<MdOutlineTravelExplore className="h-16 w-16 text-white" />}
              title="旅行"
            />
            <HobbyCard
              bgStyle="from-blue-400 to-purple-500 dark:from-blue-800 dark:to-purple-900"
              icon={<BsFilm className="h-16 w-16 text-white" />}
              title="电影"
            />
            <HobbyCard
              bgStyle="from-pink-400 to-red-500 dark:from-pink-800 dark:to-red-900"
              icon={<FaMusic className="h-16 w-16 text-white" />}
              title="音乐"
            />
          </div>
        </Tab>

        {/*联系我*/}
        <Tab
          key="contact"
          title={
            <div className="flex items-center space-x-1 sm:space-x-2">
              <GrContact className="h-5 w-5" />
              <span>联系</span>
            </div>
          }
          className="w-full"
        >
          <ContactMeCard />
        </Tab>
      </Tabs>
    </section>
  )
}
