import EducationCard from '@/components/about/EducationCard'
import HobbyCard from '@/components/about/HobbyCard'
import ProjectCard from '@/components/about/ProjectCard'
import SkillsCard from '@/components/about/SkillsCard'
import { Tabs, Tab } from '@heroui/react'
import { useState } from 'react'
import { BsFilm } from 'react-icons/bs'
import { FaMusic, FaRegHeart } from 'react-icons/fa'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { IoCode } from 'react-icons/io5'
import { LuBriefcase } from 'react-icons/lu'
import { MdOutlineSchool, MdOutlineTravelExplore } from 'react-icons/md'

type TabKey = 'education' | 'skills' | 'project' | 'hobbies'
type HeroUIColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'secondary'
  | 'default'
  | 'danger'

export default function About() {
  const [activeTab, setActiveTab] = useState<TabKey>('education')
  // Record是React内置的对象声明类型，可以声明类型安全的对象
  const tabColors: Record<TabKey, HeroUIColor> = {
    education: 'primary',
    skills: 'success',
    project: 'warning',
    hobbies: 'secondary',
  }

  return (
    <section className="content-container flex flex-col items-center space-y-5 w-full mx-auto py-20">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
        About Me
      </h1>

      <p className="dark:text-gray-400 text-lg max-w-lg">
        你好！我是一位充满激情的开发者，致力于构建优雅且高效的解决方案。我喜欢探索新技术，解决复杂问题，并不断学习成长。
      </p>

      <Tabs
        aria-label="Options"
        color={tabColors[activeTab]}
        onSelectionChange={(key) => setActiveTab(key as TabKey)}
      >
        {/* 教育 */}
        <Tab
          key="education"
          title={
            <div className="flex items-center space-x-2">
              <MdOutlineSchool className="h-5 w-5" />
              <span>教育</span>
            </div>
          }
          className="w-full flex flex-col md:flex-row gap-8"
        >
          <EducationCard
            icon={<MdOutlineSchool className="h-8 w-8 text-blue-500" />}
            major="计算机科学与技术"
            school="三峡大学"
            start="2022"
            end="2026"
            description="主修课程包括数据结构、算法、操作系统、计算机网络等。参与了多个实践项目，培养了扎实的编程基础和解决问题的能力。"
            courses={[
              '数据结构',
              '算法',
              '操作系统',
              '计算机网络',
              '计算机组成与结构',
            ]}
          />
          <EducationCard
            icon={<HiOutlineBookOpen className="h-8 w-8 text-blue-500" />}
            major="高中"
            school="天津市弟四十五中学"
            start="2018"
            end="2022"
            description="主修课程包括数学、物理、化学、生物等。参与了多个实践项目，培养了扎实的编程基础和解决问题的能力。"
            courses={['数学', '物理', '化学', '生物']}
          />
        </Tab>

        {/* 技能 */}
        <Tab
          key="skills"
          title={
            <div className="flex items-center space-x-2">
              <IoCode className="h-5 w-5" />
              <span>技能</span>
            </div>
          }
          className="w-full flex flex-col md:flex-row gap-8"
        >
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
        </Tab>

        {/* 项目 */}
        <Tab
          key="project"
          title={
            <div className="flex items-center space-x-2">
              <LuBriefcase className="h-5 w-5" />
              <span>项目</span>
            </div>
          }
          className="w-full flex flex-col gap-4"
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
            <div className="flex items-center space-x-2">
              <FaRegHeart className="h-5 w-5" />
              <span>爱好</span>
            </div>
          }
          className="w-full flex flex-wrap gap-6 justify-center"
        >
          <HobbyCard
            className="flex-1 min-w-[300px] max-w-[400px]"
            bgStyle="from-purple-400 to-pink-500 dark:from-purple-800 dark:to-pink-900"
            icon={<IoCode className="h-16 w-16 text-white" />}
            title="编程"
            description=" 我热爱编程，经常在业余时间研究新技术和框架。我特别喜欢前端开发，尤其是React和TypeScript。"
          />
          <HobbyCard
            className="flex-1 min-w-[300px] max-w-[400px]"
            bgStyle="from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-900"
            icon={<HiOutlineBookOpen className="h-16 w-16 text-white" />}
            title="读书"
            description="我喜欢读书，尤其是技术书籍。我经常阅读技术博客和论坛，了解最新的技术趋势和实践经验。"
          />
          <HobbyCard
            className="flex-1 min-w-[300px] max-w-[400px]"
            bgStyle="from-red-400 to-orange-500 dark:from-red-800 dark:to-orange-900"
            icon={<MdOutlineSchool className="h-16 w-16 text-white" />}
            title="学习"
            description="我喜欢学习，尤其是学习新的知识和技能。我经常参加培训和研讨会，了解最新的技术趋势和实践经验。"
          />
          <HobbyCard
            className="flex-1 min-w-[300px] max-w-[400px]"
            bgStyle="from-yellow-400 to-orange-500 dark:from-yellow-800 dark:to-orange-900"
            icon={<MdOutlineTravelExplore className="h-16 w-16 text-white" />}
            title="旅行"
            description="我热衷于旅行，探索不同的地方和文化。每一次旅行都是一次新的体验，让我开阔视野，丰富人生。"
          />
          <HobbyCard
            className="flex-1 min-w-[300px] max-w-[400px]"
            bgStyle="from-blue-400 to-purple-500 dark:from-blue-800 dark:to-purple-900"
            icon={<BsFilm className="h-16 w-16 text-white" />}
            title="电影"
            description="我喜欢看电影，各种类型的电影都能吸引我。电影是一种艺术形式，能带给我不同的情感体验和思考。"
          />
          <HobbyCard
            className="flex-1 min-w-[300px] max-w-[400px]"
            bgStyle="from-pink-400 to-red-500 dark:from-pink-800 dark:to-red-900"
            icon={<FaMusic className="h-16 w-16 text-white" />}
            title="音乐"
            description="我热爱音乐，它是我生活中不可或缺的一部分。不同的音乐风格能让我感受到不同的情绪和氛围。"
          />
        </Tab>
      </Tabs>
    </section>
  )
}
