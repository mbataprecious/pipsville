import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Stack, Box } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import defaultImg from '../assets/img/default.png';
import Image from 'next/image';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  overflow: 'hidden',
}));
const ImageInputStyle = styled('input')(() => ({
  '&:hover > div': {
    opacity: 1,
  },
}));

// ----------------------------------------------------------------------

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function PictureUpdateBlock() {
  const [error, setError] = useState('');
  const [progressInfo, setProgressInfo] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [progressLoading, setProgressLoading] = useState(false);
  const checkFileSize = useCallback((file) => {
    if (Math.floor(file.size / 1024 / 1024) <= 1) return true;
    return false;
  }, []);

  const handleImgChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      if (!checkFileSize(e.target.files[0])) {
        setError('max size exceeded');
        return;
      }
      setError('');
      setProgressLoading(true);
      let photoData = new FormData();
      photoData.append('photo', e.target.files[0]);
      photoData.append('purpose', 'question');

      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setProgressInfo(Math.floor((loaded * 100) / total));
        },
      };
      //   axios
      //     .post(`user/${userData.id}/photo`, photoData, config)
      //     .then((res) => {
      //       setProgressLoading(false);
      //       toast.success(`img update successful`);
      //       dispatch(updateUserData({ imageUrl: res.data.imageUrl }));
      //     })
      //     .catch((err) => {
      //       // console.log(err.response?.data.message);
      //       setProgressLoading(false);
      //       if (err.response) {
      //         toast.error(err.response.data.message);
      //       } else {
      //         toast.error(err.message);
      //       }
      //     });
    }
  };

  return (
    <RootStyle>
      <Stack direction="column" justifyContent="space-between">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="my-3 upload-img overflow-hidden rounded-full h-[8.6875rem] w-[8.6875rem] flex justify-center items-center text-center relative">
            <Image src={defaultImg} className="absolute inset-0" alt="profile" />
            {!progressLoading ? (
              <>
                {' '}
                <div className="flex justify-center bg-[#0000003a] items-center w-full h-full absolute top-0 left-0">
                  <p className="mb-0 text-white">Upload image</p>
                </div>
                <ImageInputStyle
                  className="opacity-0 absolute top-0 right0 w-full h-full cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={handleImgChange}
                />
              </>
            ) : (
              <BorderLinearProgress variant="determinate" value={progressInfo} />
            )}
          </div>
          {error && (
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              {error}
            </Typography>
          )}
        </Box>
        <Typography
          variant="caption"
          sx={{
            mt: 2,
            mx: 'auto',
            display: 'block',
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          Allowed *.jpeg, *.jpg, *.png, *.gif
          <br /> max size of 2mb
        </Typography>
        <Typography mt={2} variant="subtitle2">
          Other info
        </Typography>
        <Stack spacing={1} direction={'row'}>
          <Typography variant="subtitle2">email</Typography>
          <Typography variant="body2">mbataprecious@gmail.com</Typography>
        </Stack>
        <Stack spacing={1} direction={'row'}>
          <Typography variant="subtitle2">country</Typography>
          <Typography variant="body2">Nigeria</Typography>
        </Stack>
        <Stack spacing={1} direction={'row'}>
          <Typography variant="subtitle2">State</Typography>
          <Typography variant="body2">Imo</Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}

export default PictureUpdateBlock;
