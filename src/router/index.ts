import StillLink from '@/projectPage/StillLink.vue'
import AddProject from '@/views/AddProject.vue'
import AdminProjects from '@/views/AdminProjects.vue'
import Contact from '@/views/Contact.vue'
import Home from '@/views/Home.vue'
import Projects from '@/views/Projects.vue'
import Resume from '@/views/Resume.vue'
import Services from '@/views/Services.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/services',
      name: 'Services',
      component: Services
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/addproject',
      name: 'addproject',
      component: AddProject
    },
    {
      path: '/admin/projects',
      name: 'AdminProjects',
      component: AdminProjects
    },
    {
      path: '/project/:title',
      name: 'ProjectDetail',
      component: () => import('@/pages/ProjectDetail.vue')
    }    
  ],
})

export default router
