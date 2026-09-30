import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, Dimensions, StatusBar, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: 1,
        title: "CEK KESEGARAN\nDAGING",
        subtitle: "Pindai daging menggunakan kamera dan lihat hasil analisis AI secara cepat dan mudah.",
        image: require('../assets/images/daging.jpg')
    },
    {
        id: 2,
        title: "REKOMENDASI\nRESEP",
        subtitle: "Temukan inspirasi masakan yang sesuai dengan kondisi daging yang telah dianalisis.",
        image: require('../assets/images/rendang.jpg')
    }
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [showSplash, setShowSplash] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }).start(() => {
                setShowSplash(false);
            });
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    const handleContinue = () => {
        if (activeSlide < slides.length - 1) {
            const nextSlide = activeSlide + 1;
            setActiveSlide(nextSlide);
            Animated.spring(slideAnim, {
                toValue: nextSlide,
                useNativeDriver: false,
                bounciness: 6,
            }).start();
        } else {
            router.replace('/(tabs)');
        }
    };



    const currentSlide = slides[activeSlide];

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle={showSplash ? "dark-content" : "light-content"} />
            
            <ImageBackground 
                source={currentSlide.image}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.safeArea}>
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
                        style={styles.bottomSection}
                    >


                        <Text style={styles.title}>{currentSlide.title}</Text>
                        
                        <Text style={styles.subtitle}>
                            {currentSlide.subtitle}
                        </Text>

                        {/* Pagination Dots */}
                        <View style={styles.paginationContainer}>
                            {slides.map((_, index) => {
                                const dotWidth = slideAnim.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [8, 24, 8],
                                    extrapolate: 'clamp',
                                });
                                const dotColor = slideAnim.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: ['rgba(255,255,255,0.4)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.4)'],
                                    extrapolate: 'clamp',
                                });

                                return (
                                    <Animated.View 
                                        key={index.toString()}
                                        style={[styles.dot, { width: dotWidth, backgroundColor: dotColor }]} 
                                    />
                                );
                            })}
                        </View>

                        {/* Continue Button */}
                        <TouchableOpacity style={styles.button} onPress={handleContinue} activeOpacity={0.8}>
                            <Text style={styles.buttonText}>
                                {activeSlide === slides.length - 1 ? "Mulai Sekarang" : "Lanjutkan"}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </SafeAreaView>
            </ImageBackground>

            {/* Absolute Overlay Splash */}
            {showSplash && (
                <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
                    <Image 
                        source={require('../assets/images/logo.png')} 
                        style={styles.splashLogo} 
                        resizeMode="contain" 
                    />
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#FCEDE7',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    splashLogo: {
        width: 180,
        height: 180,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundImage: {
        width: width,
        height: height,
        flex: 1,
        justifyContent: 'space-between',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 80,
    },

    title: {
        color: '#fff',
        fontSize: 40,
        fontWeight: '900',
        lineHeight: 46,
        letterSpacing: 1,
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 30,
        textAlign: 'center',
        fontWeight: 'normal',
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginHorizontal: 4,
    },
    activeDot: {
        width: 24,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#fff',
        width: '100%',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
