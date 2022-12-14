import { ExitButton } from 'components';
import { BandMember } from 'types';

const DetailedInfoModal: React.FC<{
  closeModal: (avatarAdded?: boolean) => void;
  bandMember: BandMember;
}> = (props) => {
  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-modal-bg bg-opacity-95 flex justify-center items-center z-10'>
      <div className='relative w-[650px] h-[700px] bg-white py-20 rounded-lg flex flex-col items-center'>
        <div
          className='absolute top-4 right-4 cursor-pointer'
          onClick={() => {
            props.closeModal();
          }}
          data-cy='modal-exit-button'
        >
          <ExitButton />
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
          <h2 className='text-lg mb-2'>
            {props.bandMember.name + '  ~  ' + props.bandMember.instrument}
          </h2>
          <div className='h-[1px] w-5/6 bg-gray-400 -mx-10'></div>
        </div>
        <div className=' w-[95%] flex flex-col items-center overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-scrollbar-blue scrollbar-thumb-primary-dark-blue scrollbar-thumb-rounded scrollbar-track-rounded'>
          <div className='relative w-32 h-32 min-h-[128px] mx-52 mt-9 rounded-full overflow-hidden bg-member-card-blue  border border-white flex justify-center items-center shadow-modal-avatar'>
            {props.bandMember.avatarUrl && (
              <img
                src={
                  process.env.REACT_APP_BASE_URL! + props.bandMember.avatarUrl
                }
                alt='Band Member'
                className='w-full h-auto'
              />
            )}
          </div>
          <h6 className=' text-sm my-4'>
            ორბიტალური დაშორება:
            <span className='font-bold'>{props.bandMember.orbitWidth}</span>
          </h6>
          <p className='mx-20 text-justify'>{props.bandMember.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailedInfoModal;
