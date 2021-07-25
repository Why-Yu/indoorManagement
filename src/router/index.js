import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'barchart' }
    }]
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/poi',
    name: 'table',
    meta: { title: 'Table', icon: 'database' },
    children: [
      {
        path: 'poi',
        name: 'poi',
        component: () => import('@/views/table/poi/index'),
        meta: { title: 'POI', icon: 'pointmap' }
      },
      {
        path: '3d-tiles',
        name: '3d-tiles',
        component: () => import('@/views/table/3d-tiles/index'),
        meta: { title: '3dTiles', icon: 'apartment' }
      },
      {
        path: 'ap',
        name: 'ap',
        component: () => import('@/views/table/ap/index'),
        meta: { title: 'AP', icon: 'swap' }
      },
      {
        path: 'bluetooth',
        name: 'bluetooth',
        component: () => import('@/views/table/bluetooth/index'),
        meta: { title: 'Bluetooth', icon: 'bluetooth' }
      },
      {
        path: 'wifi',
        name: 'wifi',
        component: () => import('@/views/table/wifi/index'),
        meta: { title: 'Wifi', icon: 'wifi' }
      },
      {
        path: 'dem',
        name: 'dem',
        component: () => import('@/views/table/dem/index'),
        meta: { title: 'DEM', icon: 'heatmap' }
      },
      {
        path: 'image',
        name: 'image',
        component: () => import('@/views/table/remote-image/index'),
        meta: { title: 'RemoteImage', icon: 'block' }
      },
      {
        path: 'indoor-topo',
        name: 'indoor-topo',
        component: () => import('@/views/table/indoor-topo/index'),
        meta: { title: 'IndoorTopology', icon: 'share' }
      },
      {
        path: 'plan',
        name: 'plan',
        component: () => import('@/views/table/plan/index'),
        meta: { title: 'Plan', icon: 'image' }
      },
      {
        path: 'tiles',
        name: 'tiles',
        component: () => import('@/views/table/tiles/index'),
        meta: { title: 'Tiles', icon: 'table' }
      }
    ]
  },

  {
    path: '/cesium',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'cesium',
        component: () => import('@/views/cesium/index'),
        meta: { title: 'Cesium', icon: 'earth' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: '/form/upload',
    name: 'form',
    meta: { title: 'Form', icon: 'edit-square' },
    children: [
      {
        path: 'upload',
        name: 'upload',
        component: () => import('@/views/form/form-upload'),
        meta: { title: 'upload', icon: 'el-icon-upload2' }
      },
      {
        path: 'query',
        name: 'query',
        component: () => import('@/views/form/form-query'),
        meta: { title: 'query', icon: 'el-icon-search' }
      }
    ]
  },

  {
    path: '/form/upload',
    component: () => import('@/views/form/form-upload'),
    name: 'upload'
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
