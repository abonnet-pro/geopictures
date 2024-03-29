import PhotoResume from "./photo-resume.component";
import {StyleSheet, View} from "react-native";

export default function PhotoList({ photos, handlePressPhoto, handlePressImage, isAdmin, handlePressSuppressionPhoto }) {
    return(
        <>
            {
                photos.map(photo => {
                    return(
                        <View style={ style.photo } key={ photo.id }>
                            <PhotoResume handlePressSuppressionPhoto={handlePressSuppressionPhoto} isAdmin={isAdmin} handlePressImage={ handlePressImage } handlePressPhoto={ handlePressPhoto } photo={ photo }/>
                        </View>
                    )
                })
            }
        </>
    )
}

const style = StyleSheet.create({
    photo: {
        margin: 5
    }
});