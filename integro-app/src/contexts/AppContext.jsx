import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import useGetApi from '../hooks/useGetApi';

import almauLogo from '../assets/almau.png'

const ranks = [
  {
    slug: 'newbie',
    label: 'Новичок',
    icon: 'fi-rr-medical-star',
    value: 0,
  },
  {
    slug: 'empathy',
    label: 'Энтузиаст Эмпатии',
    icon: 'fi-rr-hand-heart',
    value: 10000,
  },
  {
    slug: 'angel',
    label: 'Бизнес Ангел',
    icon: 'fi-rr-angel',
    value: 50000,
  },
  {
    slug: 'star',
    label: 'Звезда Содействия',
    icon: 'fi-rr-star-christmas',
    value: 150000,
  },
  {
    slug: 'inspiration',
    label: 'Меценат Вдохновения',
    icon: 'fi-rr-star-shooting',
    value: 500000,
  },
];

const shopCollections = [
  {
    slug: 'almau',
    logo: almauLogo,
    name: 'AlmaU Shop'
  }
]

export const AppContext = createContext({
  token: null,
  user: null,
  login: (token) => {},
  logout: () => {},
  changeUser: (props) => {},
  
  
  ranks: [],
  getRankBySlug: (slug) => {},

  projects: [],
  getProjectById: (id) => {},

  shop: [],
  shopCollections,
  getShopItemById: (id) => {},
  getShopCollectionItems: (slug) => {},
  getCollectionBySlug: (slug) => {}
});

export const AppProvider = ({ children }) => {
  const [loading, api] = useApi();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loadingUser, user, mutateUser] = useGetApi(token ? 'users/me' : null, null, {
    token,
    success: (data) => {
      localStorage.setItem('integro-welcome', 'yes');
      return data;
    },
    error: (e) => {
      if (e?.code === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
    },
  });

  const changeUser = (props) => {
    mutateUser({ ...user, ...props });
  };

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);

    navigate('/');
  };

  const logout = () => {
    navigate('/welcome');
    setToken(null);
    localStorage.removeItem('token');
  };

  // ============== RANKS
  const getRankBySlug = (slug) => {
    return ranks.find(x => x.slug === slug)
  }


  // ============== PROJECTS
  const [loadingProjects, projects] = useGetApi('projects', []);

  const getProjectById = (id) => {
    return projects.find((x) => x._id === id);
  };


  // ============== SHOP
  const [loadingShop, shop] = useGetApi('awards/shop', []);

  const getShopWithCollection = () => {
    return shop.map(x => x.collection ? ({...x, collection: shopCollections.find(c => c.slug === x.collection)}) : x)
  }

  const getShopItemById = (id) => {
    const item = shop.find(x => x._id === id);
    if (!item) return null;
    return item;
  }

  const getShopCollectionItems = (slug) => {
    return shop.filter(x => x.collection === slug)
  }

  const getCollectionBySlug = (slug) => {
    return shopCollections.find(x => x.slug === slug)
  }

  return (
    <AppContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        getProjectById,
        projects,
        changeUser,
        ranks,
        getRankBySlug,
        shop,
        getShopCollectionItems,
        getCollectionBySlug,
        getShopItemById,
        shopCollections
      }}>
      {children}
    </AppContext.Provider>
  );
};

/*

[
    {
      _id: 1,
      name: 'LumiCard',
      description: 'Революция в освещении из вашего кошелька',
      author: '@blind_spot_gear',
      aim: 300000,
      current: 185000,
      video:
        'https://v2.kickstarter.com/1700770461-oFafQnzBeuRE%2Fzxu75nuXC%2FzHHk%2FaAsXEyEpjo08VDQ%3D/projects/4659162/video-1260828-h264_high.mp4',
      poster:
        'https://cdn.discordapp.com/attachments/759453474487271432/1175846841783423037/image.png',
      awards: [
        {
          _id: 1,
          image: '',
          title: 'Bird',
          description: '',
          price: 10000,
          includes: ['LumiCard', 'Custom USB-C Cable', 'MagSafe Sticker'],
        },
        {
          _id: 2,
          image: '',
          title: 'Crowdfunding Special 20% off',
          description: '',
          price: 15000,
          includes: ['LumiCard', 'Custom USB-C Cable', 'MagSafe Sticker'],
        },
        {
          _id: 3,
          image: '',
          title: 'Crowdfunding Special 20% off',
          description: '',
          price: 15000,
          includes: ['LumiCard', 'Custom USB-C Cable', 'MagSafe Sticker'],
        },
      ],
      reviews: [
        {
          user: {
            _id: 5465463,
            name: 'Олег',
            rank: 'pro',
            donations: 54
          },
          text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов',
          createdDate: '2023-11-24T19:05:21.109Z',
          
          answer: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов',
          answerDate: '2023-11-22T15:47:17.109Z'
        },
        {
          user: {
            _id: 5465741,
            name: 'Марьяна',
            rank: 'newbie',
            donations: 2
          },
          text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов',
          createdDate: '2023-11-24T19:05:21.109Z',

          answer: null,
          answerDate: null
        }
      ]
    },
    {
      _id: 2,
      name: 'Everything',
      description: 'Брюки и рубашка с защитой от всего на свете',
      author: '@graphene_x',
      aim: 1500000,
      current: 5420300,
      video: null,
      poster:
        'https://cdn.discordapp.com/attachments/759453474487271432/1175846922007879821/image.png',
      awards: [],
      reviews: []
    },
  ]

*/
