import React, { useState } from 'react';
import {
  useCreateShortUrlMutation,
  useGetAllUrlsQuery,
} from '../services/urlsApiService';

const Add = () => {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');

  const [createShortUrl] = useCreateShortUrlMutation();
  const getAllUrls = useGetAllUrlsQuery();

  const onSubmit = async e => {
    e.preventDefault();

    await createShortUrl({
      url: e.target[0]?.value,
      alias: e.target[1]?.value ? e.target[1].value : undefined,
    });

    setUrl('');
    setAlias('');

    await getAllUrls.refetch();
  };

  return (
    <div>
      <main>
        <section className="w-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="mb-2 fs-1">URL Shortener</h1>
          <form className="w-50" onSubmit={onSubmit}>
            <input
              className="w-100 border border-primary p-2 mb-2 fs-3 h-25"
              type="text"
              placeholder="http://samplesite.com"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <input
              className="w-100 border border-primary p-2 mb-2 fs-3 h-25"
              type="text"
              placeholder="alias for short-url (optional)"
              value={alias}
              onChange={({ target }) => setAlias(target.value)}
            />
            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-danger m-5">
                Shorten!
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Add;
