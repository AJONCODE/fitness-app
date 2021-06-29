import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
} from "react-native";

import React from "react";
import ImageEditor from "@react-native-community/image-editor";
import * as ImagePicker from 'expo-image-picker'

export default function AddPic() {
	const [image, setImage] = React.useState(null);

	const pickImage = () => {
		ImagePicker.launchImageLibraryAsync({
			allowEditing: true,
			aspect: [2, 1],
		}).then((result) => {
			if (result.cancelled) {
				return;
			}

			setImage(result.uri);

			// const cropData = {
			// 	offset: {
			// 		x: 0,
			// 		y: 0,
			// 	},
			// 	size: {
			// 		width: result.width,
			// 		height: result.height,
			// 	},
			// 	displaySize: {
			// 		width: 200,
			// 		height: 100,
			// 	},
			// 	resizeMode: 'contain',
			// };

			// ImageEditor.cropImage(result.uri, cropData).then((uri) => {
			// 	console.info('uri: ', uri);
			// 	setImage(uri);
			// }).catch((err) => console.error('Error: ', err));
		});
	};

  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={() => pickImage()}>
				<Text>One Camera Roll</Text>
			</TouchableOpacity>

			{
				image && (
					<Image style={styles.img} source={{ uri: image }} />
				)
			}
    </View>
  )
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	img: {
		width: 150,
		height: 150,
		resizeMode: 'contain',
		backgroundColor: 'black',
	},
});