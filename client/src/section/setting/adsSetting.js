import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdsSettings,
  updateAdsSettings,
} from "../../features/setting/actions/settingActions";
import {
  getAdsSettingsSelector,
  getAdsSettingsLoadingSelector,
  updateAdsSettingsLoadingSelector,
} from "../../features/setting/selectors/settingSelectors";
import { addToast } from "../../features/toast/actions/toastAction";

function AdsSetting() {
  const [adsStatus, setAdsStatus] = useState(true);
  const [admobBannerId, setAdmobBannerId] = useState("");
  const [fbBannerId, setFbBannerId] = useState("");
  const [interstitialType, setInterstitialType] = useState("");
  const [interstitialClickCount, setInterstitialClickCount] = useState("");
  const [admobNativeId, setAdmobNativeId] = useState("");
  const [fbNativeId, setFbNativeId] = useState("");
  const [nativeType, setNativeType] = useState("");
  const [nativeCount, setNativeCount] = useState("");
  const [id, setId] = useState("");
  const loading = useSelector(getAdsSettingsLoadingSelector);
  const adsSettings = useSelector(getAdsSettingsSelector);
  const updateLoading = useSelector(updateAdsSettingsLoadingSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdsSettings());
  }, []);

  useEffect(() => {
    if (adsSettings) {
      // setAdsStatus(adsSettings.adsStatus)
      setAdmobBannerId(adsSettings.admobBannerId)
      setFbBannerId(adsSettings.facebookBannerId)
      setInterstitialType(adsSettings.interstitialType)
      setInterstitialClickCount(adsSettings.interstitialClickCount)
      setAdmobNativeId(adsSettings.admobNativeId)
      setFbNativeId(adsSettings.facebookNativeId)
      setNativeType(adsSettings.nativeType)
      setNativeCount(adsSettings.nativeCount)
      setId(adsSettings._id)
    }
  }, [adsSettings]);

  const handleUpdate = () => {
    console.log("hello");
    if (
      !admobBannerId ||
      !fbBannerId ||
      !interstitialType ||
      !interstitialClickCount ||
      !admobNativeId ||
      !fbNativeId ||
      !nativeType ||
      !nativeCount
    ) {
      return dispatch(addToast("All fields are required", "error"));
    }

    const data = {
      adsStatus,
      admobBannerId,
      facebookBannerId: fbBannerId,
      interstitialType,
      interstitialClickCount,
      admobNativeId,
      facebookNativeId: fbNativeId,
      nativeType,
      nativeCount,
    };

    dispatch(updateAdsSettings(id, data));
  };

  return (
    <Box maxWidth={700}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, mt: 2 }}>Ads Status</FormLabel>
            <Select value={adsStatus ?? false } onChange={(e) => setAdsStatus(e.target.value)}>
          <MenuItem value={true}>On</MenuItem>
          <MenuItem value={false}>Off</MenuItem>
        </Select>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, mt: 2 }}>Admob Banner Id</FormLabel>
            <OutlinedInput
              value={admobBannerId ?? ''}
              onChange={(e) => setAdmobBannerId(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, mt: 2 }}>FB Banner Id</FormLabel>
            <OutlinedInput
              value={fbBannerId ?? ''}
              onChange={(e) => setFbBannerId(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, mt: 2 }}>Interstitial Type</FormLabel>
            <OutlinedInput
              value={interstitialType ?? ''}
              onChange={(e) => setInterstitialType(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, mt: 2 }}>
              Interstitial Click Count
            </FormLabel>
            <OutlinedInput
              type="number"
              value={interstitialClickCount ?? ''}
              onChange={(e) => setInterstitialClickCount(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, mt: 2 }}>Admob Native Id</FormLabel>
            <OutlinedInput
              value={admobNativeId ?? ''}
              onChange={(e) => setAdmobNativeId(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, mt: 2 }}>FB Native Id</FormLabel>
            <OutlinedInput
              value={fbNativeId ?? ''}
              onChange={(e) => setFbNativeId(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, mt: 2 }}>Native Type</FormLabel>
            <OutlinedInput
              value={nativeType ?? '' }
              onChange={(e) => setNativeType(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1, mt: 2 }}>Native Count</FormLabel>
            <OutlinedInput
              type="number"
              value={nativeCount ?? ''}
              onChange={(e) => setNativeCount(e.target.value)}
            />
          </FormControl>
          <Box sx={{ my: 2, textAlign: "center" }}>
            {updateLoading ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={() => handleUpdate()}
                variant="contained"
                sx={{
                  p: 1.2,
                  backgroundImage:(theme)=> theme.palette.gradientColors[4],
                }}
              >
                Update
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default AdsSetting;
