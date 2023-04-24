import {ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {containerStyle} from "../../../commons/styles/commons.styles";
import * as React from "react";
import {useEffect, useState} from "react";
import {Image} from "@rneui/themed";
import JeuImageDetail from "../components/jeu-image-detail.component";
import JeuGadgets from "../components/jeu-gadgets.component";
import JeuNonValide from "../components/jeu-non-valide.component";
import JeuValide from "../components/jeu-valide.component";
import JeuScoreDetail from "../components/jeu-score-detail.component";
import {Camera} from "expo-camera";
import {modalfy} from "react-native-modalfy";
import {getGadget, sendPhotoJouee, useGadgetRecommencer} from "../services/jeu.service";
import LoadingGeneral from "../../../commons/component/loading-general.component";
import * as Location from 'expo-location';
import {Gadget} from "../enums/gadget.enum";
import LoadingView from "../../../commons/component/loading.component";

export default function JeuContainer({route, navigation}) {

    const [photo, setPhoto] = useState(null);
    const [permission, setPermission] = useState(null);
    const [location, setLocation] = useState(null);
    const {currentModal,openModal,closeModal,closeModals,closeAllModals} = modalfy();
    const [loadingSendPhoto, setLoadingSendPhoto] = useState(false);
    const [loadingPermissionLocation, setLoadingPermissionLocation] = useState(false);

    const init = () => {
        const photo = route.params.photo;
        setPhoto(photo);
    }

    const handlePressImage = (image) => {
        navigation.navigate("imageZoom", {
            image: image
        });
    }

    const handlePressJouer = async () => {
        const cameraPermission  = await Camera.requestCameraPermissionsAsync();
        setPermission(cameraPermission);
        if(cameraPermission.status !== 'granted') {
            openModal("ModalInfoDroitCamera");
        }

        const locationPermission = await Location.requestForegroundPermissionsAsync();
        setLocation(locationPermission);
        if(locationPermission.status !== 'granted') {
            openModal("ModalInfoDroitLocation");
        }
    }

    const handleSendPhoto = async (photoPrise) => {
        setLoadingSendPhoto(true);
        const location = await Location.getCurrentPositionAsync({});
        const photoJoue = await sendPhotoJouee(photo.id, photoPrise.uri, location);
        setLoadingSendPhoto(false);
        setPhoto(photoJoue.data);
    }

    const goBack = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'photos', params: {zoneId: photo.zoneId} }],
        });
    }

    const handlePressGadgetGps = async () => {
        openModal("ModalUseGadgetGps", {photoId: photo.id});
    }

    const handlePressGadgetIndice = async () => {
        openModal("ModalUseGadgetIndice", {photoId: photo.id});
    }


    const handlePressGadgetTop1 = async () => {
        openModal("ModalUseGadgetTop1", {photoId: photo.id, navigation: navigation});
    }

    const handlePressGadgetDistance = async () => {
        openModal("ModalUseGadgetDistance", {photoId: photo.id});
        const locationPermission = await Location.requestForegroundPermissionsAsync();
        setLocation(locationPermission);

        if(locationPermission.status !== 'granted') {
            openModal("ModalInfoDroitLocation");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        closeAllModals(() => openModal("ModalUseGadgetDistance", {photoId: photo.id, location: location}));
    }

    const handlePressGadgetDirection = async () => {
        openModal("ModalUseGadgetDirection", {photoId: photo.id});
        const locationPermission = await Location.requestForegroundPermissionsAsync();
        setLocation(locationPermission);

        if(locationPermission.status !== 'granted') {
            openModal("ModalInfoDroitLocation");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        closeAllModals(() => openModal("ModalUseGadgetDirection", {photoId: photo.id, location: location}));
    }

    const handlePressGadgetSuccessGps = async () => {
        openModal("ModalUseGadgetSuccesGps", {photoId: photo.id});
        const locationPermission = await Location.requestForegroundPermissionsAsync();
        setLocation(locationPermission);

        if(locationPermission.status !== 'granted') {
            openModal("ModalInfoDroitLocation");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        closeAllModals(() => openModal("ModalUseGadgetSuccesGps", {photoId: photo.id, location: location}));
    }

    const handleValidRecommencer = async (photoId) => {
        const photo = await useGadgetRecommencer(photoId);
        setPhoto(photo.data);
    }

    useEffect(init, []);

    return (
        <>
            <ImageBackground
                source={require('../../../../assets/auth_background.jpg')}
                style={containerStyle.backgroundHover100}>
                { loadingSendPhoto && <LoadingGeneral titre={"Calcul du score en cours ..."}></LoadingGeneral>}
                <View style={style.backContainer}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Image style={style.back} source={require('../../../../assets/back.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={style.containerTop}>
                    <JeuImageDetail photo={photo} handlePressImage={handlePressImage}/>
                </View>
                <View style={style.containerMiddle}>
                    {
                        photo?.score ?
                            <JeuScoreDetail photo={photo} handleValidRecommencer={handleValidRecommencer}/>
                            :
                            <JeuGadgets handlePressGadgetGps={handlePressGadgetGps}
                                        handlePressGadgetDistance={handlePressGadgetDistance}
                                        handlePressGadgetDirection={handlePressGadgetDirection}
                                        handlePressGadgetSuccessGps={handlePressGadgetSuccessGps}
                                        handlePressGadgetTop1={handlePressGadgetTop1}
                                        handlePressGadgetIndice={handlePressGadgetIndice}/>
                    }
                </View>
                <View style={style.containerBottom}>
                    {
                        photo?.score ?
                            <JeuValide photo={photo} handlePressImage={ handlePressImage }/>
                            :
                            <JeuNonValide location={location} permission={permission} handlePressJouer={ handlePressJouer } handleSendPhoto={ handleSendPhoto }/>
                    }
                </View>
            </ImageBackground>
        </>
    )
}

const style = StyleSheet.create({
    backContainer: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    back: {
        width: 50,
        height: 50,
    },
    containerTop: {
        flex: 4,
        margin: 10
    },
    containerMiddle: {
        flex: 1,
        margin: 10,
    },
    containerBottom: {
        flex: 4,
        margin: 10
    }
})