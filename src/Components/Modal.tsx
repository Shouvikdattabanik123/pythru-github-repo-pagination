import usePagination from '../Utils/usePagination';
import BarChart from './BarChart';

export default function Modal({
  showModal,
  setShowModal,
  modalDetails,
}: { showModal: boolean; setShowModal: Function; modalDetails: any }) {
  const { paginatedItems, currentPage, totalPages, prevPage, nextPage } = usePagination(
    modalDetails.modalData || [],
    10,
  );

  const disablePreviousPage = currentPage === 1;
  const disableNextPage = currentPage === totalPages;

  return showModal ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Modal Title</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <BarChart data={paginatedItems} width={700} height={600} />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-around p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className={`${
                  disablePreviousPage ? 'text-gray-500 background-gray-50' : 'text-red-500 background-transparent'
                } font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                disabled={disablePreviousPage}
                onClick={prevPage}
              >
                Previous
              </button>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className={`${
                  disableNextPage ? 'text-gray-500 background-gray-50' : 'text-red-500 background-transparent'
                } font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                disabled={disableNextPage}
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  ) : null;
}
