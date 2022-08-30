import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DashboardWrapper, DashboardPageTitle } from 'components';
import { BiographyTextarea, Input } from 'pages/BandMembers/components';
import { BandMemberInputs, BandMember, ResponseData } from 'types';
import {
  postBandMemberRequest,
  getBandMemberRequest,
  putBandMemberRequest,
} from 'services';
import { useEffect } from 'react';

const AddBandMember = () => {
  const navigate = useNavigate();

  // Exists if user is updating band member
  const { memberId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BandMemberInputs>();

  useEffect(() => {
    const getBandMember = async () => {
      try {
        const res: ResponseData = await getBandMemberRequest(
          memberId as string
        );
        if (res.status === 'success') {
          const member: BandMember = res.data.bandMember;
          setValue('name', member.name);
          setValue('instrument', member.instrument);
          setValue('orbitWidth', member.orbitWidth);
          setValue('color', member.color);
          setValue('bio', member.bio);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (memberId) {
      getBandMember();
    } else {
      // Remove saved values if backend request is already sent
      if (localStorage.getItem('alreadyAdded') === 'true') {
        localStorage.removeItem('alreadyAdded');
        localStorage.removeItem('name');
        localStorage.removeItem('instrument');
        localStorage.removeItem('orbitWidth');
        localStorage.removeItem('color');
        localStorage.removeItem('bio');
      } else {
        // Set saved values to inputs
        setValue('name', localStorage.getItem('bandMemberName') || '');
        setValue('instrument', localStorage.getItem('instrument') || '');
        setValue('color', localStorage.getItem('color') || '');
        setValue('bio', localStorage.getItem('bio') || '');
        if (
          localStorage.getItem('orbitWidth') &&
          Number(localStorage.getItem('orbitWidth'))
        ) {
          setValue('orbitWidth', Number(localStorage.getItem('orbitWidth')));
        }
      }
      // Save values on unmount
      return () => {
        localStorage.setItem('bandMemberName', watch('name') || '');
        localStorage.setItem('instrument', watch('instrument'));
        localStorage.setItem('orbitWidth', watch('orbitWidth').toString());
        localStorage.setItem('color', watch('color'));
        localStorage.setItem('bio', watch('bio'));
      };
    }
  }, [memberId, setValue, watch]);

  const onSubmit: SubmitHandler<BandMemberInputs> = async (data) => {
    try {
      let res: ResponseData;
      if (memberId) {
        res = await putBandMemberRequest(memberId, data);
      } else {
        res = await postBandMemberRequest(data);
        localStorage.setItem('alreadyAdded', 'true');
      }
      if (res.status === 'success') {
        navigate('/band-members');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardWrapper>
      <DashboardPageTitle title='შეცვალე ინფორმაცია ჯგუფის წევრზე' />
      <div className='w-full h-full flex flex-col items-center justify-evenly'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center justify-center gap-3'
        >
          <Input
            id='name'
            key='name'
            name='name'
            placeholder='სახელი'
            type='text'
            register={register}
            errors={errors}
          />
          <div className='flex justify-center items-center flex-wrap gap-2 xl:gap-8'>
            <Input
              id='instrument'
              key='instrument'
              name='instrument'
              placeholder='ინსტრუმენტი'
              type='text'
              register={register}
              errors={errors}
            />
            <Input
              id='orbitWidth'
              key='orbitWidth'
              name='orbitWidth'
              placeholder='ორბიტის სიგანე'
              type='text'
              register={register}
              errors={errors}
            />
            <Input
              id='color'
              key='color'
              name='color'
              placeholder='ფერი'
              type='text'
              register={register}
              errors={errors}
            />
          </div>
          <BiographyTextarea register={register} errors={errors} />
          <button
            type='submit'
            className='button bg-member-card-blue text-content-white rounded-lg text-sm font-bold mt-12 px-10 pt-4 pb-3 tracking-wide'
          >
            {memberId ? 'წევრის ცვლილება' : 'დაამატე წევრი'}
          </button>
          <Link
            to='/band-members/'
            className='text-link-blue underline text-lg font-bold mt-3'
          >
            გადი უკან
          </Link>
        </form>
      </div>
    </DashboardWrapper>
  );
};

export default AddBandMember;
