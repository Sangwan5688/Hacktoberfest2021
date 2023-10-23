// simple remake of ping tool in C++

#include <iostream>
#include <cstring>
#include <cerrno>
#include <cstdlib>
#include <unistd.h>
#include <netinet/ip.h>
#include <netinet/ip_icmp.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <ctime>
#include <chrono>

// Define the IP header structure
struct IPHeader {
    struct ip ip;
    struct icmphdr icmp;
    char data[64];
};

// Calculate the checksum for the ICMP packet
unsigned short calculateChecksum(unsigned short *buffer, int size) {
    unsigned long sum = 0;
    while (size > 1) {
        sum += *buffer++;
        size -= 2;
    }
    if (size == 1) {
        sum += *(unsigned char *)buffer;
    }
    sum = (sum >> 16) + (sum & 0xFFFF);
    sum += (sum >> 16);
    return static_cast<unsigned short>(~sum);
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " <IP address>" << std::endl;
        return 1;
    }

    const char *target_ip = argv[1];
    int sockfd = socket(AF_INET, SOCK_RAW, IPPROTO_ICMP);

    if (sockfd == -1) {
        std::cerr << "Error creating socket: " << strerror(errno) << std::endl;
        return 1;
    }

    struct sockaddr_in dest_addr;
    dest_addr.sin_family = AF_INET;
    dest_addr.sin_port = 0;
    inet_pton(AF_INET, target_ip, &(dest_addr.sin_addr));

    IPHeader packet;
    memset(&packet, 0, sizeof(packet));

    // Fill in the ICMP header
    packet.icmp.type = ICMP_ECHO;
    packet.icmp.code = 0;
    packet.icmp.un.echo.sequence = 1;
    packet.icmp.checksum = calculateChecksum((unsigned short *)&packet.icmp, sizeof(packet.icmp));

    // Calculate the packet size
    int packet_size = sizeof(packet);

    auto start_time = std::chrono::high_resolution_clock::now();

    if (sendto(sockfd, &packet, packet_size, 0, (struct sockaddr *)&dest_addr, sizeof(dest_addr)) == -1) {
        std::cerr << "Error sending ICMP packet: " << strerror(errno) << std::endl;
        return 1;
    }

    // Wait for a response
    IPHeader reply_packet;
    socklen_t addr_len = sizeof(dest_addr);

    if (recvfrom(sockfd, &reply_packet, sizeof(reply_packet), 0, (struct sockaddr *)&dest_addr, &addr_len) == -1) {
        std::cerr << "Error receiving ICMP packet: " << strerror(errno) << std::endl;
        return 1;
    }

    auto end_time = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end_time - start_time);

    std::cout << "Ping to " << target_ip << " took " << duration.count() << "ms." << std::endl;

    close(sockfd);

    return 0;
}
