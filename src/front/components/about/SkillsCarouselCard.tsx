import { Card, CardBody } from '@heroui/react'
import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function SkillsCarouselCard() {
  const skills = [
    {
      name: 'JavaScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'Vue.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    },
    {
      name: 'React',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'Node.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    },
    {
      name: 'Python',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'Docker',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    },
    {
      name: 'AWS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    },
    {
      name: 'MongoDB',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    },
    {
      name: 'GraphQL',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    },
  ]

  const carouselRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      // 修正宽度计算：w-32 是 8rem (128px)，mx-4 是 2rem (32px)，所以每个卡片占 160px
      const cardWidth = 160 // 每个卡片的总宽度 (包括间距)
      const totalWidth = skills.length * cardWidth // 原始技能数组的总宽度

      // 启动动画
      controls.start({
        x: -totalWidth, // 移动整个原始技能数组的宽度
        transition: {
          duration: skills.length * 5, // 调整动画时长，确保平滑（可以根据需要调整速度）
          ease: 'linear',
          repeat: Infinity, // 无限循环
          repeatType: 'loop', // 循环类型
        },
      })
    }

    // 清理动画
    return () => controls.stop()
  }, [controls, skills.length])

  // 渲染两组技能以实现无缝循环
  const doubledSkills = [...skills, ...skills]

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardBody className="relative overflow-hidden h-40 border-l-4 border-l-blue-500 w-full">
          <motion.div className="flex absolute left-0 top-4" ref={carouselRef} animate={controls}>
            {doubledSkills.map((skill, index) => (
              <div key={`${skill.name}-${index}`} className="flex-shrink-0 w-32 h-32 mx-4">
                <div className="p-4 flex flex-col items-center justify-center h-full border bg-white rounded-xl shadow-md transform transition-transform duration-300">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-16 h-16 object-contain mb-2"
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-black">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </CardBody>
      </Card>
    </div>
  )
}
