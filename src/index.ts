export default class VantaServerlessPlugin {
  constructor(serverless: any) {
    // In later versions of serverless the service is just a string
    const serivceName =
      (serverless?.service?.service as any)?.name || serverless.service.service;

    serverless.service.provider = {
      ...(serverless.service.provider ?? {}),
      deploymentBucketObject: {
        name: null,
        ...(serverless.service.provider?.deploymentBucketObject ?? {}),
        blockPublicAccess: true, // This is by defualt true in serverless due to ACLs and policies, but we want to be explicit for Vanta
        tags: {
          VantaDescription: `A bucket which holds the source code for the ${serivceName} service used while deploying the lambda functions`,
          VantaContainsUserData: "false", // Only source code no user data
          VantaNonProd: (
            serverless.service.provider.stage !== "prod"
          ).toString(),
          ...(serverless.service.provider?.deploymentBucketObject?.tags ?? {}),
        },
      },
    };
  }
}
