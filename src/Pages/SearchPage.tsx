import { useCallback, useEffect, useState } from 'react';
import Modal from '../Components/Modal';
import debounce from '../Utils/debounce';

export default function SearchPage() {
  const [owner, setOwner] = useState('');
  const [repolist, setRepoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState<any>([]);

  const fetchRepos = async (userName: string) => {
    try {
      if (userName) {
        const response = await (
          await fetch(`https://api.github.com/users/${userName}/repos`, {
            headers: {
              Authorization:
                'BEARER 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',
            },
          })
        ).json();
        setRepoList(response.map((repo: any) => repo.name));
      }
    } catch {
      setRepoList([]);
    }
  };
  const debouncedFetchRepos = useCallback(debounce(fetchRepos), []);

  useEffect(() => {
    debouncedFetchRepos(owner);
  }, [owner]);

  const handleRepoClick = (repo: string) => {
    fetch(`https://api.github.com/repos/${owner}/${repo}/stats/participation`, {
      headers: {
        Authorization:
          'BEARER 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',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const modalData = data.all.map((commit: any, i: number) => ({ week: `Week ${i + 1}`, commitCount: commit }));
        data.all.length && setModalDetails({ owner, repo, modalData });
        setShowModal(true);
      });
  };

  return (
    <div className="bg-gray-100 h-screen">
      <input
        className="my-10 p-4 rounded-lg w-72 h-10 outline-none text-sm text-gray-700 pr-2"
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        placeholder="Search repos..."
      />
      <ul className="bg-gray-100 flex flex-col items-center">
        {repolist.length > 0
          ? repolist.map((repo) => (
              <li
                className="max-w-sm rounded cursor-pointer overflow-hidden shadow-lg hover:shadow-md px-6 py-4 my-2 font-bold text-xl"
                key={repo}
                onClick={() => handleRepoClick(repo)}
              >
                {repo}
              </li>
            ))
          : owner && 'No Records Found'}
      </ul>
      <Modal showModal={showModal} setShowModal={setShowModal} modalDetails={modalDetails} />
    </div>
  );
}
