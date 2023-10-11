#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>

int main() {
    // Load an image from file
    cv::Mat originalImage = cv::imread("image.jpg");

    // Check if the image was loaded successfully
    if (originalImage.empty()) {
        std::cout << "Error: Could not open or find the image." << std::endl;
        return -1;
    }

    // Create a grayscale version of the image
    cv::Mat grayImage;
    cv::cvtColor(originalImage, grayImage, cv::COLOR_BGR2GRAY);

    // Display the original and grayscale images
    cv::imshow("Original Image", originalImage);
    cv::imshow("Grayscale Image", grayImage);

    // Wait for a key press and close the windows when any key is pressed
    cv::waitKey(0);
    cv::destroyAllWindows();

    return 0;
}
