import { createContext, useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import useGetApi from '../hooks/useGetApi';

import almauLogo from '../assets/almau.png';
import toast from 'react-hot-toast';
import Auth from '../pages/Auth';

export const AppContext = createContext({
  token: null,
  user: null,
  login: (token) => {},
  logout: () => {},
  section: '',
  changeSection: () => {}
});

const shopCollections = [
  {
    slug: 'almau',
    logo: almauLogo,
    name: 'AlmaU Shop'
  }
]

export const AppProvider = ({ children }) => {
  const [loading, api] = useApi();
  const [section, setSection] = useState(localStorage.getItem('section') || 'users');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loadingUser, user, mutateUser] = useGetApi(token ? 'users/me' : null, null, {
    token,
    success: (data) => {
      if (data.role !== 'admin') {
        logout();
        toast.error('Нет доступа');
        return null
      }
      
      return data;
    },
    error: (e) => {
      if (e?.code === 401) {
        localStorage.removeItem('token');
      }
    },
  });

  useEffect(() => {
    localStorage.setItem('section', section);
  }, [section])

  const changeUser = (props) => {
    mutateUser({ ...user, ...props });
  };

  const changeSection = (v) => {
    setSection(v)
  }

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);

    setSection('users');
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // ============== PROJECTS
  const [loadingProjects, projects] = useGetApi('projects', []);

  const getProjectById = (id) => {
    return projects.find((x) => x._id === id);
  };


  // ============== SHOP

  if (!token) return <Auth login={login} />;

  return (
    <AppContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        section,
        changeSection,

        getProjectById,
        projects,
        changeUser,
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
