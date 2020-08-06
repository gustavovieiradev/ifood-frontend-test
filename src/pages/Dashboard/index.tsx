import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logoImg from '../../assets/logo.png';
import emptyStateImg from '../../assets/empty-state.svg';
import errorImg from '../../assets/error.svg';

import { api, auth, mock } from '../../services/api';
import { IPlaylist, IFilters, IDataToken, IResponsePlayList, IResponseFilter, IFieldFilter } from '../../models';
import Filters from '../../components/Filters';
import Playlists from '../../components/Playlists';
import BoxState from '../../components/BoxState';
import Loading from '../../components/Loading';
import { Title, BoxPlaylists, BoxFilter, Logo } from './styles';

const Dashboard: React.FC = () => {
  const [message, setMessage] = useState<String>("");
  const [token, setToken] = useState<String>("");
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [filters, setFilters] = useState<IFilters[]>([]);
  const [idTimeout, setIdTimeout] =  useState<number>(0);
  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [fieldFilter, setFieldFilter] = useState<IFieldFilter>({});

  /**
   * Token generation for an API
   */
  const signIn = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const basicToken = btoa(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_SECRET}`)

    const headers = {
      headers: {
        'Authorization': `Basic ${basicToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    const response = await auth.post<IDataToken>('/api/token', params, headers);
    setToken(response.data.access_token);
    api.defaults.headers.authorization = `${response.data.token_type} ${response.data.access_token}`;
    return response.data;
    

  }, [setToken]);

  const formatParamsApiPlaylist = useCallback((params) => {
    for (const key in params) { 
      if (!params[key]) {
        delete params[key];
      }
    }
    return params;
  }, []);

  /**
   * Loading data from playlists
   */
  const loadPlaylists = useCallback (async() => {
    try {
      setLoading(true);
      clearAllTimeout();
      const params = formatParamsApiPlaylist(fieldFilter);
      const {data} = await api.get<IResponsePlayList>('/browse/featured-playlists', {params});
      setPlaylists(data.playlists.items);
      setMessage(data.message); 
      const idInterval = setInterval(async() => {
        await loadPlaylists();
      }, 30000);
      setIdTimeout(idInterval);
      setLoading(false);
    } catch (err) {
      await signIn();
      await loadPlaylists();
    }
    
  }, [fieldFilter, signIn, idTimeout, setIdTimeout]);

  /**
   * Removing instances of interval  
   */
  const clearAllTimeout = useCallback(() => {
    let id = setInterval(function() {}, 0);

    while (id--) {
      clearInterval(id); 
    }
  }, []);

  /**
   * Loading initial data (token generation, api playlists, api filters)
   */
  useEffect(() => {
    signIn().then((data: IDataToken) => {
      if (data.access_token) {
        loadPlaylists();
      }
    }).catch(() => {
      setLoading(false)
      setError(true);
    })

    mock.get<IResponseFilter>('/5a25fade2e0000213aa90776').then(({data}) => {
      data.filters.forEach(filter => {
        setFieldFilter({[filter.id]: ""});
      })
      setFilters(data.filters);
    })
  }, []);

  /**
   * Calling api playlists when a filter changes
   */
  useEffect(() => {
    if (token) {
      loadPlaylists();
    }
  }, [fieldFilter]);

  /**
   *  onChange of selection filter input
   */
  const changeFilter = useCallback((event, filter) => {
    let value = event.target.value;

    if (value) {
      if (filter.id === 'country') {
        value = event.target.value.split('_');
        value = value[1] ? value[1] : value[0];
      }
      
      setFieldFilter({
        ...fieldFilter,
        [event.target.name]: value
      });
    } else {
      delete fieldFilter[event.target.name];
      setFieldFilter({...fieldFilter});
    }

  }, [setFieldFilter, fieldFilter]);

  /**
   * onChange of timestamp filter input
   */
  const changeFieldTimestamp = useCallback((day, filter) => {
    setFieldFilter({
      ...fieldFilter,
      [filter.id]: day
    });

  }, [setFieldFilter, fieldFilter]);

  /**
   * onChange of number filter input
   */
  const changeFieldNumber = useCallback((event, min?, max?) => {
    const value = parseInt(event.target.value);

    if (min && value < min) {
      toast(`Informe um número maior ou igual a ${min}`);
      return;
    }

    if (max && value > max) {
      toast(`Informe um número menor ou igual a ${max}`);
      return;
    }

    if (value >= 0) {
      setFieldFilter({
        ...fieldFilter,
        [event.target.name]: value
      });
    } else {
      // delete fieldFilter[event.target.name];
      setFieldFilter({
        ...fieldFilter,
        [event.target.name]: null
      });
    }

  }, [setFieldFilter, fieldFilter]);

  /**
   * Clearing all filters
   */
  const clearFilters = useCallback(() => {
    filters.forEach(filter => {
      setFieldFilter({[filter.id]: ""});
    })
  }, [setFieldFilter, filters]);

  return (
    <>
      <Logo>
        <img src={logoImg} alt="Github Explorer"/>
        <strong><span className="spot">Spot</span><span className="ifood">ifood</span></strong>
      </Logo>
      <Title>{message}</Title>

      <BoxFilter>
        <Filters filters={filters} 
                 fieldFilter={fieldFilter} 
                 changeFieldTimestamp={changeFieldTimestamp} 
                 changeFieldNumber={changeFieldNumber} 
                 changeSelectFilter={changeFilter} 
                 clearFilters={clearFilters} />
      </BoxFilter>

      {!loading && !error && playlists.length > 0 && (
        <BoxPlaylists>
          <Playlists data={playlists} />
        </BoxPlaylists>  
      )}

      {!loading && !error && playlists.length === 0 && (
        <BoxState message="Nenhuma playlist encontrada" image={emptyStateImg} />
      )}

      {!loading && error && (
        <BoxState message="Erro no servidor" image={errorImg} />
      )}

      {loading && (
        <Loading />
      )}
    </>
  );
}

export default Dashboard;