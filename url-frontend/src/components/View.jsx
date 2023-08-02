import React, { useEffect, useState } from 'react';
import { useGetAllUrlsQuery } from '../services/urlsApiService';

const View = () => {
  const [urls, setUrls] = useState([]);
  const { data } = useGetAllUrlsQuery();

  useEffect(() => {
    setUrls(data);
  }, [data]);

  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Original Url</th>
            <th>Short Url</th>
          </tr>
        </thead>
        <tbody>
          {urls?.map((url, idx) => (
            <tr key={idx}>
              <td>{url.originalUrl.match(/^(.*?:\/\/[^/]+)/)?.[1]}</td>
              <td>
                <a href={`${url.shortUrl}`}>{url.shortUrl}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default View;
