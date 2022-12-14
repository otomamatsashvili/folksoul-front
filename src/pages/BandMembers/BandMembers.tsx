import { useEffect, useState } from 'react';
import { DashboardWrapper, DashboardPageTitle } from 'components';
import { MemberCard } from 'pages/BandMembers/components';
import { Link } from 'react-router-dom';
import { getBandMembersRequest } from 'services';
import { BandMember } from 'types';

const BandMembers = () => {
  const [bandMembers, setBandMembers] = useState<BandMember[]>();
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const showPagination = numberOfPages >= 2;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [memberChanged, setMemberChanged] = useState<number>(0);

  // After deleting the last member on a page reduce currentPage
  if (currentPage > 0 && currentPage >= numberOfPages) {
    setCurrentPage(numberOfPages - 1);
  }

  useEffect(() => {
    const getBandMembers = async () => {
      try {
        const members = await getBandMembersRequest();
        setBandMembers(members.data.bandMembers);
        setNumberOfPages(Math.ceil(members.data.bandMembers.length / 3));
      } catch (e) {
        //
      }
    };
    getBandMembers();
  }, [memberChanged]);

  const memberChangeHandler = () => {
    setMemberChanged((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <>
      <DashboardWrapper>
        <DashboardPageTitle title='ჯგუფის წევრები' />
        <div className=' w-full h-full flex flex-col items-center justify-start gap-10 mt-8 xl:mt-20 xl:gap-28'>
          <div className='flex flex-wrap gap-4 justify-center px-2 2xl:gap-16'>
            {bandMembers &&
              bandMembers.map((bandMember, i) => {
                if (i >= currentPage * 3 && i < (currentPage + 1) * 3) {
                  return (
                    <MemberCard
                      bandMember={bandMember}
                      key={bandMember._id}
                      memberChangeHandler={memberChangeHandler}
                    />
                  );
                } else {
                  return null;
                }
              })}
            {!bandMembers?.length && (
              <h3 className='text-lg'>ამ ეტაპზე ბენდი უწევროდაა</h3>
            )}
          </div>
          {showPagination && (
            <div className='flex gap-5'>
              {[...Array(numberOfPages)].map((e, i) => {
                return (
                  <div
                    key={i}
                    className={`w-5 h-5 rounded-full cursor-pointer ${
                      i === currentPage
                        ? 'bg-pagination-active'
                        : 'bg-pagination-inactive'
                    }`}
                    onClick={() => {
                      setCurrentPage(i);
                    }}
                    data-cy={`pagination-button-${i}`}
                  ></div>
                );
              })}
            </div>
          )}
        </div>
        <Link
          to='/band-members/add-member'
          className='text-link-blue underline text-lg font-bold mb-20'
          data-cy='add-member'
        >
          ახალი წევრი გვყავს?
        </Link>
      </DashboardWrapper>
    </>
  );
};

export default BandMembers;
