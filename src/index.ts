class VantaServerlessPlugin {
  constructor(serverless: any) {
    // In later versions of serverless the service is just a string
    const serviceName =
      (serverless?.service?.service as any)?.name || serverless.service.service;
    const deploymentBucketKey = serverless.version.startsWith("3")
      ? "deploymentBucket"
      : "deploymentBucketObject";

    serverless.service.provider[deploymentBucketKey] = {
      ...(serverless.service.provider?.[deploymentBucketKey] ?? {}),
      blockPublicAccess: true, // This is by defualt true in serverless due to ACLs and policies, but we want to be explicit for Vanta
      tags: {
        VantaDescription: `A bucket which holds the source code for the ${serviceName} service used while deploying the lambda functions`,
        VantaContainsUserData: "false", // Only source code no user data
        VantaNonProd: (serverless.service.provider.stage !== "prod").toString(),
        ...(serverless.service.provider?.[deploymentBucketKey]?.tags ?? {}),
      },
    };
  }
}

// Needed because serverless uses commonjs imports for plugins
module.exports = VantaServerlessPlugin;
